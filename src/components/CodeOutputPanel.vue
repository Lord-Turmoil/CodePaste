<script setup lang="ts">
/**
 * CodeOutputPanel - Highlighted code output display
 */
import { computed } from 'vue';

const props = defineProps<{
  highlightedCode: string;
  language: string;
  languageLabel: string;
  lineNumberEnabled: boolean;
  showHelp: boolean;
}>();

const codeClass = computed(() => `language-${props.language}`);
const preClass = computed(() => props.lineNumberEnabled ? 'line-numbers' : '');
</script>

<template>
  <div class="panel output animate__animated animate__fadeInRight">
    <div
      v-if="showHelp"
      class="cover animate__animated animate__fadeIn"
    >
      <p><b>Step 1</b><br />Select the language of your code 🧐</p>
      <p><b>Step 2</b><br />Paste your code to the input panel 🤨</p>
      <p><b>Step 3</b><br />Click the circle with arrow to make yummy code paste 😋</p>
      <p><b>Step 4</b><br />Change the color scheme to meet your taste 😆</p>
      <p><b>Step 5</b><br />Click the clipboard-like button to copy the code 😁</p>
      <p><b>Step 6</b><br />Paste the code to your document and be professional! 😍</p>
    </div>
    <div class="code">
      <pre :id="'pre'" :class="preClass"><code
        :id="'code'"
        :class="codeClass"
        v-html="highlightedCode"
      ></code></pre>
    </div>
  </div>
</template>
