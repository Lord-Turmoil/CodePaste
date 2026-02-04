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
    <div class="prompt">
      <span>Language</span>
    </div>
    <div class="select-wrapper">
      <div class="select" id="lang" title="Select language">
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
  width: 150px;
}

.select select {
  background-image: linear-gradient(-45deg, #c1dfc4 0%, #deecdd 100%);
  background-color: #ddeede;
  color: #3f3f3f;
  padding: 12px;
  width: 100%;
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
