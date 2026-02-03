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
    <div class="prompt">
      <span>Color Scheme</span>
    </div>
    <div class="select-wrapper">
      <div class="select" title="Select Color Scheme">
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
