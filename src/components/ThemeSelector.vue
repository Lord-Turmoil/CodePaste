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

<style scoped>
.tool {
  align-self: center;
  display: flex;
  flex-direction: row;
  margin: 5px;
}

.tool > div {
  margin: 0 5px;
  align-self: center;
}

.select-wrapper {
  --select-height: 40px;
}

.select {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: var(--select-height);
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
}

.select select {
  background-image: linear-gradient(-45deg, #c1dfc4 0%, #deecdd 100%);
  background-color: #ddeede;
  color: #3f3f3f;
  padding: 12px;
  width: 250px;
  border: none;
  font-size: 16px;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.select::before {
  content: "\f13a";
  font-family: FontAwesome;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  aspect-ratio: 1;
  text-align: center;
  font-size: 28px;
  line-height: var(--select-height);
  color: rgba(0, 139, 0, 1.0);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  transition: 0.3s;
}

.select:hover::before {
  color: rgba(0, 139, 0, 0.8);
  background-color: rgba(255, 255, 255, 0.2);
}

.select select option {
  padding: 30px;
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
