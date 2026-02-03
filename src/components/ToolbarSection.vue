<script setup lang="ts">
/**
 * ToolbarSection - Main toolbar with all controls
 */
import type { LanguageOption } from '@/types';
import LanguageSelector from './LanguageSelector.vue';
import ThemeSelector from './ThemeSelector.vue';
import LineNumberToggle from './LineNumberToggle.vue';
import FlipButton from './FlipButton.vue';

defineProps<{
  selectedLanguage: string;
  languages: LanguageOption[];
  selectedTheme: string;
  lineNumberEnabled: boolean;
  helpActive: boolean;
  darkModeActive: boolean;
}>();

defineEmits<{
  'update:selectedLanguage': [value: string];
  'update:selectedTheme': [value: string];
  'update:lineNumberEnabled': [value: boolean];
  toggleHelp: [];
  toggleDarkMode: [];
}>();
</script>

<template>
  <nav
    class="tools-wrapper animate__animated animate__flipInX"
    role="toolbar"
    aria-label="Code paste tools"
  >
    <div class="tools">
      <LanguageSelector
        :model-value="selectedLanguage"
        :languages="languages"
        @update:model-value="$emit('update:selectedLanguage', $event)"
      />
      <ThemeSelector
        :model-value="selectedTheme"
        @update:model-value="$emit('update:selectedTheme', $event)"
      />
      <LineNumberToggle
        :model-value="lineNumberEnabled"
        @update:model-value="$emit('update:lineNumberEnabled', $event)"
      />
    </div>

    <FlipButton
      id="help"
      :active="helpActive"
      front-icon="fa-solid fa-question"
      back-icon="fa-solid fa-xmark"
      front-title="Show help"
      back-title="Hide help"
      front-label="Show help instructions"
      back-label="Hide help instructions"
      @click="$emit('toggleHelp')"
    />

    <FlipButton
      id="mode"
      :active="darkModeActive"
      front-icon="fa-solid fa-jedi"
      back-icon="fa-brands fa-sith"
      front-title="Toggle dark mode"
      back-title="Toggle light mode"
      front-label="Enable dark mode"
      back-label="Enable light mode"
      back-color="rgb(165, 5, 5)"
      @click="$emit('toggleDarkMode')"
    />
  </nav>
</template>

<style scoped>
.tools-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
  flex-wrap: wrap;
  gap: 5px;
}

.tools {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

@media screen and (max-width: 950px) {
  .tools-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .tools {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
