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
  <section class="panel output animate__animated animate__fadeInRight" aria-label="Code output panel">
    <div
      v-if="showHelp"
      class="cover animate__animated animate__fadeIn"
      role="region"
      aria-label="Usage instructions"
    >
      <div class="help-steps">
        <p><strong>Step 1</strong><br />Select the language of your code 🧐</p>
        <p><strong>Step 2</strong><br />Paste your code to the input panel 🤨</p>
        <p><strong>Step 3</strong><br />Click the circle with arrow to make yummy code paste 😋</p>
        <p><strong>Step 4</strong><br />Change the color scheme to meet your taste 😆</p>
        <p><strong>Step 5</strong><br />Click the clipboard-like button to copy the code 😁</p>
        <p><strong>Step 6</strong><br />Paste the code to your document and be professional! 😍</p>
      </div>
    </div>
    <div class="code">
      <div class="code-toolbar">
        <pre :id="'pre'" :class="preClass"><code
          :id="'code'"
          :class="codeClass"
          v-html="highlightedCode"
          role="region"
          aria-label="Highlighted code output"
          :aria-describedby="highlightedCode ? undefined : 'no-output-hint'"
        ></code></pre>
        <div class="toolbar">
          <div class="toolbar-item">
            <span>{{ languageLabel }}</span>
          </div>
        </div>
      </div>
      <p v-if="!highlightedCode" id="no-output-hint" class="visually-hidden">
        No code has been highlighted yet. Enter code in the input panel and click the convert button.
      </p>
    </div>
  </section>
</template>

<style scoped>
.panel {
  position: relative;
  width: 50%;
  min-height: var(--panel-min-height, 400px);
  max-height: var(--panel-max-height, 600px);
  overflow: hidden;
}

.code {
  box-sizing: border-box;
  width: 100%;
  min-height: var(--panel-min-height, 400px);
  max-height: var(--panel-max-height, 600px);
  border-radius: var(--panel-border-radius, 10px);
  overflow: hidden;
}

.cover {
  --animate-duration: 0.3s;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: var(--panel-min-height, 400px);
  border-radius: var(--panel-border-radius, 10px);
  background-image: linear-gradient(45deg, #a8edea 0%, #fed6e3 100%);
  z-index: 5;
  text-align: center;
  overflow: auto;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1) inset;
}

.help-steps {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.cover p {
  align-self: center;
  width: 90%;
  margin: 10px auto;
  line-height: 1.6;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-top-left-radius: var(--panel-border-radius, 10px);
  border-top-right-radius: var(--panel-border-radius, 10px);
}

.toolbar-item span {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media screen and (max-width: 768px) {
  .panel {
    width: 100%;
  }
}
</style>
