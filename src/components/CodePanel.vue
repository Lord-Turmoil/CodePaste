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
  <div class="wrapper">
    <CodeInputPanel
      :model-value="sourceCode"
      @update:model-value="$emit('update:sourceCode', $event)"
    />

    <div class="action-wrapper">
      <ActionButton
        id="convert"
        icon="fa-solid fa-arrows-rotate"
        title="Make code paste"
        animation-class="animate__spin"
        @click="$emit('convert')"
      />
      <ActionButton
        id="copy"
        icon="fa-regular fa-clipboard"
        title="Copy code paste"
        animation-class="animate__grow"
        @click="$emit('copy')"
      />
      <ActionButton
        id="erase"
        icon="fa-solid fa-eraser"
        title="Clear code paste"
        animation-class="animate__shake"
        @click="$emit('erase')"
      />
      <ActionButton
        id="random"
        icon="fa-solid fa-shuffle"
        title="Get random example"
        animation-class="animate__rubber"
        @click="$emit('random')"
      />
      <ActionButton
        id="issue"
        icon="fa-regular fa-lightbulb"
        title="Request new language"
        animation-class="animate__blink"
        @click="$emit('issue')"
      />
      <ActionButton
        v-if="showCoffeeButton"
        id="coffee"
        icon="fa-solid fa-yen-sign"
        title="Buy me a coffee"
        animation-class="animate__grow"
        @click="$emit('coffee')"
      />
    </div>

    <CodeOutputPanel
      :highlighted-code="highlightedCode"
      :language="language"
      :language-label="languageLabel"
      :line-number-enabled="lineNumberEnabled"
      :show-help="showHelp"
    />
  </div>
</template>
