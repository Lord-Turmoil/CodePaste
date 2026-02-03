<script setup lang="ts">
/**
 * ThemeSelector - Dropdown for selecting color theme
 */
import { themeOptions } from '@/composables';

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="tool">
    <label for="theme-selector" class="prompt">
      <span>Color Scheme</span>
    </label>
    <div class="select-wrapper">
      <div class="select" title="Select color scheme">
        <select
          id="theme-selector"
          :value="modelValue"
          aria-label="Select color scheme for syntax highlighting"
          @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
          <option
            v-for="theme in themeOptions"
            :key="theme.value"
            :value="theme.value"
          >
            {{ theme.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool {
  align-self: center;
  display: flex;
  flex-direction: row;
  margin: 5px;
}

.tool > div,
.tool > label {
  margin: 0 5px;
  align-self: center;
}

.prompt span {
  font-weight: 500;
}

.select-wrapper {
  position: relative;
}

.select select {
  width: 100%;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.select select:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 1px;
}

@media screen and (max-width: 950px) {
  .tool {
    align-self: flex-start;
  }

  .tool .prompt {
    width: 8em;
    text-align: right;
  }
}
</style>
