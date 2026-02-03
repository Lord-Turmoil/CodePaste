<script setup lang="ts">
/**
 * LanguageSelector - Dropdown for selecting programming language
 */
import type { LanguageOption } from '@/types';

defineProps<{
  modelValue: string;
  languages: LanguageOption[];
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="tool">
    <label for="lang-selector" class="prompt">
      <span>Language</span>
    </label>
    <div class="select-wrapper">
      <div class="select" title="Select programming language">
        <select
          id="lang-selector"
          :value="modelValue"
          aria-label="Select programming language"
          @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
          <optgroup
            v-for="(group, groupName) in groupedLanguages"
            :key="groupName"
            :label="groupName"
          >
            <option
              v-for="lang in group"
              :key="lang.value"
              :value="lang.value"
            >
              {{ lang.label }}
            </option>
          </optgroup>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Language groups for organized display
const languageGroups: Record<string, string[]> = {
  'Programming Language': ['c', 'cpp', 'csharp', 'go', 'java', 'kotlin', 'perl', 'python', 'r', 'ruby', 'rust', 'scala', 'swift'],
  'Web Development': ['css', 'html', 'javascript', 'php', 'typescript'],
  'Scripting Language': ['bash', 'batch', 'lua', 'powershell'],
  'Markup Language': ['json', 'latex', 'markdown', 'toml', 'xml', 'yaml'],
  'Configuration Language': ['cmake', 'docker', 'makefile'],
  'Database': ['sql'],
  'Assembly Language': ['llvm', 'nasm'],
  'Others': ['coq', 'diff', 'glsl', 'matlab', 'verilog'],
};

export default {
  computed: {
    groupedLanguages(): Record<string, { value: string; label: string }[]> {
      const groups: Record<string, { value: string; label: string }[]> = {};
      
      for (const [groupName, langIds] of Object.entries(languageGroups)) {
        groups[groupName] = langIds.map(id => {
          const found = (this as any).languages.find((l: LanguageOption) => l.value === id);
          return found || { value: id, label: id.toUpperCase() };
        });
      }
      
      return groups;
    },
  },
};
</script>

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

.select {
  width: 150px;
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
