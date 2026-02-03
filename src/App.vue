<script setup lang="ts">
/**
 * App.vue - Main application component for Code Paste
 * A syntax highlighting tool for Microsoft Office documents
 */
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/show-language/prism-show-language.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

// Import language support
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-csharp.js';
import 'prismjs/components/prism-go.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-kotlin.js';
import 'prismjs/components/prism-perl.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-r.js';
import 'prismjs/components/prism-ruby.js';
import 'prismjs/components/prism-rust.js';
import 'prismjs/components/prism-scala.js';
import 'prismjs/components/prism-swift.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-batch.js';
import 'prismjs/components/prism-lua.js';
import 'prismjs/components/prism-powershell.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-latex.js';
import 'prismjs/components/prism-markdown.js';
import 'prismjs/components/prism-toml.js';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-cmake.js';
import 'prismjs/components/prism-docker.js';
import 'prismjs/components/prism-makefile.js';
import 'prismjs/components/prism-sql.js';
import 'prismjs/components/prism-llvm.js';
import 'prismjs/components/prism-nasm.js';
import 'prismjs/components/prism-coq.js';
import 'prismjs/components/prism-diff.js';
import 'prismjs/components/prism-glsl.js';
import 'prismjs/components/prism-matlab.js';
import 'prismjs/components/prism-verilog.js';

import HeaderSection from './components/HeaderSection.vue';
import BannerSection from './components/BannerSection.vue';
import ToolbarSection from './components/ToolbarSection.vue';
import CodePanel from './components/CodePanel.vue';
import DocsSection from './components/DocsSection.vue';
import FooterSection from './components/FooterSection.vue';

import { useCodeSamples, useTheme, useNotifications, useUserPreferences } from './composables';
import { normalizeString, copyHTMLElement } from './utils';
import type { LanguageOption } from './types';

// Composables
const { getCode, getRandomLanguage } = useCodeSamples();
const { currentTheme, isDarkMode, themeUrl, setTheme, setDarkMode, restoreTheme } = useTheme();
const { success, warning, error, alert } = useNotifications();
const { restoreLanguage, saveLanguage, restoreLineNumber, saveLineNumber, checkNotificationShown, markNotificationShown } = useUserPreferences();

// State
const sourceCode = ref('');
const highlightedCode = ref('');
const selectedLanguage = ref('c');
const lineNumberEnabled = ref(false);
const helpActive = ref(false);
const showHelp = ref(true);
const issueLock = ref(false);
const showCoffeeButton = ref(false);
const supportContent = ref('');
const notificationContent = ref('');

// Language options
const languages: LanguageOption[] = [
  // Programming Language
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'perl', label: 'Perl' },
  { value: 'python', label: 'Python' },
  { value: 'r', label: 'R' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'rust', label: 'Rust' },
  { value: 'scala', label: 'Scala' },
  { value: 'swift', label: 'Swift' },
  // Web Development
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'php', label: 'PHP' },
  { value: 'typescript', label: 'TypeScript' },
  // Scripting Language
  { value: 'bash', label: 'Bash' },
  { value: 'batch', label: 'Batch' },
  { value: 'lua', label: 'Lua' },
  { value: 'powershell', label: 'PowerShell' },
  // Markup Language
  { value: 'json', label: 'JSON' },
  { value: 'latex', label: 'LaTeX' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'toml', label: 'TOML' },
  { value: 'xml', label: 'XML' },
  { value: 'yaml', label: 'YAML' },
  // Configuration Language
  { value: 'cmake', label: 'CMake' },
  { value: 'docker', label: 'Docker' },
  { value: 'makefile', label: 'Makefile' },
  // Database
  { value: 'sql', label: 'SQL' },
  // Assembly Language
  { value: 'llvm', label: 'LLVM' },
  { value: 'nasm', label: 'NASM' },
  // Others
  { value: 'coq', label: 'Coq' },
  { value: 'diff', label: 'Diff' },
  { value: 'glsl', label: 'GLSL' },
  { value: 'matlab', label: 'MATLAB' },
  { value: 'verilog', label: 'Verilog' },
];

const selectedLanguageLabel = computed(() => {
  const lang = languages.find(l => l.value === selectedLanguage.value);
  return lang?.label || selectedLanguage.value.toUpperCase();
});

// Enable manual Prism mode
Prism.manual = true;

/**
 * Highlight the code
 */
function highlight(): void {
  const code = sourceCode.value.trim();
  if (!code) {
    highlightedCode.value = '';
    return;
  }

  // Get the grammar for the selected language
  const grammar = Prism.languages[selectedLanguage.value] || Prism.languages.plaintext;
  let html = Prism.highlight(code, grammar, selectedLanguage.value);
  
  // Replace newlines with <br> and normalize spaces
  html = html.replaceAll('\n', '<br>');
  highlightedCode.value = normalizeString(html);
  
  // Add line numbers if enabled
  if (lineNumberEnabled.value) {
    nextTick(() => {
      Prism.highlightAll();
    });
  }
}

/**
 * Transform highlighted code to table format for copying with line numbers
 */
function transformToTable(html: string): HTMLElement {
  // Remove line numbers rows span
  const pos = html.lastIndexOf('<span aria-hidden="true" class="line-numbers-rows">');
  let content = pos > -1 ? html.substring(0, pos) : html;

  // Split by <br>
  const lines = content.split('<br>');
  let table = '<table>';
  for (let i = 0; i < lines.length; i++) {
    table += `<tr><td class="lineno" style="text-align:right;padding-right:5px;width:3em">${i + 1}</td><td class="line">${lines[i]}</td></tr>`;
  }
  table += '</table>';

  const tempElement = document.createElement('div');
  tempElement.innerHTML = table;
  return tempElement;
}

/**
 * Copy highlighted code to clipboard
 */
async function copyCode(): Promise<boolean> {
  const codeElement = document.querySelector('pre > code');
  if (!codeElement) return false;

  const backupHtml = (codeElement as HTMLElement).innerHTML;
  let targetElement: HTMLElement = codeElement as HTMLElement;

  if (lineNumberEnabled.value) {
    targetElement = transformToTable(backupHtml);
  }

  const result = copyHTMLElement(targetElement);
  
  // Restore original content
  (codeElement as HTMLElement).innerHTML = backupHtml;
  
  return result;
}

// Actions
function handleConvert(): void {
  if (sourceCode.value.trim()) {
    saveLanguage(selectedLanguage.value);
    highlight();
    success('Code paste ready to go 😋');
    closeHelp();
    updateHelp();
  } else {
    warning('The ingredient, please 🤧');
  }
}

async function handleCopy(): Promise<void> {
  if (!highlightedCode.value) {
    warning('Make your code paste first 😨');
    return;
  }

  const copied = await copyCode();
  if (copied) {
    success('Code paste copied to clipboard 🤩');
  } else {
    error('Oops! Something went wrong 🤯');
  }
}

function handleErase(): void {
  const hadOutput = highlightedCode.value !== '';
  sourceCode.value = '';
  highlight();
  
  if (!hadOutput) {
    warning("You haven't made any paste yet 😅");
  } else {
    success('Code paste cleared 🥹');
  }
  updateHelp();
}

function handleRandom(): void {
  const randomLang = getRandomLanguage(selectedLanguage.value);
  selectedLanguage.value = randomLang;
  sourceCode.value = getCode(randomLang);
  highlight();
  success('You like the random paste? 🙃');
  closeHelp();
  updateHelp();
}

function handleIssue(): void {
  if (issueLock.value) {
    error('Issue page is already opening... ⌛');
    return;
  }
  
  issueLock.value = true;
  let duration = 3;
  
  const notification = success(`Opening issue page in ${duration}... 📝`, duration, () => {
    clearInterval(interval);
  });
  
  const interval = setInterval(() => {
    notification.setContent(`Opening issue page in ${--duration}... 📝`);
  }, 1000);
  
  setTimeout(() => {
    window.open('https://github.com/Lord-Turmoil/CodePaste/issues/new', '_blank');
    issueLock.value = false;
  }, duration * 1000);
}

function handleCoffee(): void {
  if (supportContent.value) {
    alert('Buy me a coffee 🍵', supportContent.value);
  }
}

function handleLogoClick(): void {
  promptNotification();
}

function toggleHelp(): void {
  helpActive.value = !helpActive.value;
  updateHelp();
}

function closeHelp(): void {
  if (helpActive.value) {
    helpActive.value = false;
  }
}

function updateHelp(): void {
  showHelp.value = !highlightedCode.value || helpActive.value;
}

function promptNotification(): void {
  if (notificationContent.value) {
    alert('Notification 🔔', notificationContent.value);
  }
}

// Theme handling
function handleThemeChange(theme: string): void {
  setTheme(theme);
}

function handleDarkModeToggle(): void {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('mode', isDarkMode.value ? 'dark' : 'light');
}

function handleLineNumberChange(enabled: boolean): void {
  lineNumberEnabled.value = enabled;
  saveLineNumber(enabled);
  if (highlightedCode.value) {
    highlight();
    closeHelp();
    updateHelp();
  }
}

function handleLanguageChange(lang: string): void {
  selectedLanguage.value = lang;
  if (highlightedCode.value) {
    highlight();
  }
}

// Restore preferences on mount
onMounted(async () => {
  // Restore preferences
  restoreTheme();
  lineNumberEnabled.value = restoreLineNumber();
  
  // Check for support content
  const supportElement = document.getElementById('support-content');
  if (supportElement?.children.length === 1) {
    supportContent.value = supportElement.innerHTML;
    showCoffeeButton.value = true;
  }
  
  // Check for notification content
  const notificationElement = document.getElementById('notification-content');
  if (notificationElement?.children.length === 1) {
    notificationContent.value = notificationElement.innerHTML;
  }
  
  // Show notification if not shown before
  if (!checkNotificationShown()) {
    markNotificationShown();
    promptNotification();
  }
  
  // Restore language and load random sample
  const savedLang = restoreLanguage();
  setTimeout(() => {
    if (savedLang) {
      selectedLanguage.value = savedLang;
      sourceCode.value = getCode(savedLang);
    } else {
      const randomLang = getRandomLanguage(null);
      selectedLanguage.value = randomLang;
      sourceCode.value = getCode(randomLang);
    }
    highlight();
    closeHelp();
    updateHelp();
  }, 1000);
});

// Watch for theme URL changes
watch(themeUrl, (url) => {
  if (url) {
    const themeLink = document.getElementById('theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = url;
    }
  }
});

// Watch for dark mode changes
watch(isDarkMode, (dark) => {
  const modeLink = document.getElementById('mode-css') as HTMLLinkElement;
  if (modeLink) {
    modeLink.href = dark ? 'css/dark.css' : '';
  }
});
</script>

<template>
  <div class="border" :class="{ 'dark-mode': isDarkMode }">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <HeaderSection @logo-click="handleLogoClick" />
    <hr aria-hidden="true" />
    
    <BannerSection />
    <hr aria-hidden="true" />
    
    <ToolbarSection
      :selected-language="selectedLanguage"
      :languages="languages"
      :selected-theme="currentTheme"
      :line-number-enabled="lineNumberEnabled"
      :help-active="helpActive"
      :dark-mode-active="isDarkMode"
      @update:selected-language="handleLanguageChange"
      @update:selected-theme="handleThemeChange"
      @update:line-number-enabled="handleLineNumberChange"
      @toggle-help="toggleHelp"
      @toggle-dark-mode="handleDarkModeToggle"
    />
    <hr aria-hidden="true" />
    
    <div id="main-content">
      <CodePanel
        v-model:source-code="sourceCode"
        :highlighted-code="highlightedCode"
        :language="selectedLanguage"
        :language-label="selectedLanguageLabel"
        :line-number-enabled="lineNumberEnabled"
        :show-help="showHelp"
        :show-coffee-button="showCoffeeButton"
        @convert="handleConvert"
        @copy="handleCopy"
        @erase="handleErase"
        @random="handleRandom"
        @issue="handleIssue"
        @coffee="handleCoffee"
      />
    </div>
    <hr id="less-anchor" aria-hidden="true" />
    
    <DocsSection />
    <hr aria-hidden="true" />
    
    <FooterSection />
    
    <!-- Hidden content containers for dynamic content -->
    <div id="support-content" style="display: none;">
      <slot name="support"></slot>
    </div>
    <div id="notification-content" style="display: none;">
      <slot name="notification"></slot>
    </div>
  </div>
</template>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: auto;
}

hr {
  width: 90%;
  margin: 0px auto;
  height: 2px;
  border: none;
  background-image: linear-gradient(90deg, transparent 0%, #3f3f3f 50%, transparent 100%);
}

.border {
  width: 100%;
  min-width: 600px;
  min-height: 100%;
  overflow-x: hidden;
  background-color: rgb(228, 233, 240);
}

/* Skip link for accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #4a90d9;
  color: white;
  padding: 8px 16px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}

/* Prism overrides */
pre {
  box-sizing: border-box !important;
  margin: 0 !important;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px 10px !important;
  min-height: 400px !important;
  border-radius: 10px;
}

pre.line-numbers {
  padding-left: 50px !important;
}

pre code {
  display: block !important;
  box-sizing: border-box !important;
  border-radius: 10px;
  font-size: 14px !important;
  width: max-content;
  min-width: 100% !important;
}

pre code .token {
  font-size: 14px;
}

pre code table {
  font-family: inherit;
  border-collapse: collapse;
}

pre code table tr .lineno {
  text-align: right;
  padding-right: 5px;
  border-right: 0.5px solid #ccc;
}

pre code table tr .line {
  padding-left: 5px;
}

/* AlertifyJS overrides */
.alertify-notifier .ajs-message {
  border-radius: 100px;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.3);
}

.alertify-notifier .ajs-message.ajs-success {
  background: rgba(92, 184, 17, 0.9);
}

.alertify-notifier .ajs-message.ajs-warning {
  background: rgba(251, 192, 45, 0.9);
}

.alertify-notifier .ajs-message.ajs-error {
  background: rgba(254, 26, 0, 0.9);
}

.alertify .ajs-dialog {
  border-radius: 20px;
  overflow: hidden;
}

.alertify .ajs-dialog .ajs-header {
  font-family: 'Lucida Handwriting', cursive;
  font-size: large;
}

.alertify .ajs-dialog .ajs-button {
  border-radius: 10px;
  background-color: #07c160;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
  color: white;
  transition: 0.3s;
}

.alertify .ajs-dialog .ajs-button:hover {
  opacity: 0.9;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
}

/* Custom classes */
.coffee {
  width: 80%;
  margin: auto;
  font-family: 'Lucida Handwriting', cursive;
}

.coffee img {
  width: 100%;
}

.notification {
  width: 80%;
  margin: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Animations */
.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animate__fadeInDown {
  animation-name: fadeInDown;
}

.animate__fadeInLeft {
  animation-name: fadeInLeft;
}

.animate__fadeInRight {
  animation-name: fadeInRight;
}

.animate__flipInX {
  animation-name: flipInX;
}

.animate__flipInY {
  animation-name: flipInY;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

.animate__fadeOut {
  animation-name: fadeOut;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes flipInY {
  from {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
