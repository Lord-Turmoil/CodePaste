<script setup lang="ts">
/**
 * CodePanel - Main code panel with input, actions, and output
 */
import CodeInputPanel from './CodeInputPanel.vue';
import CodeOutputPanel from './CodeOutputPanel.vue';
import ActionButton from './ActionButton.vue';

defineProps<{
  sourceCode: string;
  highlightedCode: string;
  language: string;
  languageLabel: string;
  lineNumberEnabled: boolean;
  showHelp: boolean;
  showCoffeeButton: boolean;
}>();

defineEmits<{
  'update:sourceCode': [value: string];
  convert: [];
  copy: [];
  erase: [];
  random: [];
  issue: [];
  coffee: [];
}>();
</script>

<template>
  <main class="wrapper" role="main">
    <CodeInputPanel
      :model-value="sourceCode"
      @update:model-value="$emit('update:sourceCode', $event)"
    />

    <nav class="action-wrapper" aria-label="Code actions">
      <ActionButton
        id="convert"
        icon="fa-solid fa-arrows-rotate"
        title="Make code paste"
        aria-label="Convert and highlight code"
        animation-class="animate__spin"
        @click="$emit('convert')"
      />
      <ActionButton
        id="copy"
        icon="fa-regular fa-clipboard"
        title="Copy code paste"
        aria-label="Copy highlighted code to clipboard"
        animation-class="animate__grow"
        @click="$emit('copy')"
      />
      <ActionButton
        id="erase"
        icon="fa-solid fa-eraser"
        title="Clear code paste"
        aria-label="Clear input and output"
        animation-class="animate__shake"
        @click="$emit('erase')"
      />
      <ActionButton
        id="random"
        icon="fa-solid fa-shuffle"
        title="Get random example"
        aria-label="Load random code example"
        animation-class="animate__rubber"
        @click="$emit('random')"
      />
      <ActionButton
        id="issue"
        icon="fa-regular fa-lightbulb"
        title="Request new language"
        aria-label="Open GitHub issue to request new language"
        animation-class="animate__tada"
        @click="$emit('issue')"
      />
      <ActionButton
        v-if="showCoffeeButton"
        id="coffee"
        icon="fa-solid fa-yen-sign"
        title="Buy me a coffee"
        aria-label="Support the developer"
        animation-class="animate__grow"
        @click="$emit('coffee')"
      />
    </nav>

    <CodeOutputPanel
      :highlighted-code="highlightedCode"
      :language="language"
      :language-label="languageLabel"
      :line-number-enabled="lineNumberEnabled"
      :show-help="showHelp"
    />
  </main>
</template>

<style scoped>
.wrapper {
  --panel-min-height: 400px;
  --panel-max-height: 600px;
  --panel-border-radius: 10px;
  --code-font-size: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 10px auto;
  gap: 10px;
}

.action-wrapper {
  --animate-duration: 1s;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 5px;
}

@media screen and (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
  }

  .action-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
