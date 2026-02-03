<script setup lang="ts">
/**
 * CodeInputPanel - Text area for code input with auto-resize
 */
import { ref, watch, onMounted } from 'vue';

const MIN_HEIGHT = 400;
const MAX_HEIGHT = 600;

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

function handleInput(event: Event): void {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  autoResize(target);
}

function autoResize(textarea: HTMLTextAreaElement): void {
  textarea.style.height = 'auto';
  let targetHeight = textarea.scrollHeight;

  if (targetHeight > MAX_HEIGHT) {
    textarea.classList.add('full');
    targetHeight = MAX_HEIGHT;
  } else {
    textarea.classList.remove('full');
    if (targetHeight < MIN_HEIGHT) {
      targetHeight = MIN_HEIGHT;
    }
  }

  textarea.style.height = `${targetHeight}px`;
}

function handlePaste(event: ClipboardEvent): void {
  event.preventDefault();
  const clipboardData = event.clipboardData;
  if (!clipboardData) return;

  // Fix for copying from PowerPoint where '\n' is replaced with '\v'
  // and ' ' is replaced with '\xa0' (non-breaking space)
  const text = clipboardData
    .getData('text')
    .replaceAll(String.fromCharCode(11), '\n')
    .replaceAll(String.fromCharCode(160), ' ');

  document.execCommand('insertText', false, text);
}

function handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Tab') {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    
    if (event.shiftKey) {
      handleUnindent(textarea);
    } else {
      handleIndent(textarea);
    }
  }
}

function handleIndent(textarea: HTMLTextAreaElement): void {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start === end) {
    // Single cursor - just insert spaces
    document.execCommand('insertText', false, '    ');
    textarea.setSelectionRange(start + 4, start + 4);
    return;
  }

  // Multi-line selection
  const lines = textarea.value.split('\n');
  const { affectedLines, lineStarts } = getAffectedLines(textarea);

  let offset = 0;
  for (const lineIndex of affectedLines) {
    const lineStart = lineStarts[lineIndex] + offset;
    textarea.setSelectionRange(lineStart, lineStart);
    document.execCommand('insertText', false, '    ');
    offset += 4;
  }

  textarea.setSelectionRange(start + 4, end + 4 * affectedLines.length);
}

function handleUnindent(textarea: HTMLTextAreaElement): void {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const { affectedLines, lineStarts } = getAffectedLines(textarea);

  let newStart = start;
  let newEnd = end;
  let offset = 0;

  for (let i = affectedLines.length - 1; i >= 0; i--) {
    const lineIndex = affectedLines[i];
    const lineStart = lineStarts[lineIndex];
    let removeCount = 0;

    // Count spaces to remove (up to 4)
    for (let j = 0; j < 4 && lineStart + j < textarea.value.length; j++) {
      if (textarea.value[lineStart + j] === ' ') {
        removeCount++;
      } else {
        break;
      }
    }

    if (removeCount > 0) {
      textarea.setSelectionRange(lineStart, lineStart + removeCount);
      document.execCommand('delete');

      if (i === affectedLines.length - 1) {
        newStart = Math.max(lineStart, start - removeCount);
      }
      newEnd -= removeCount;
    }
  }

  textarea.setSelectionRange(Math.max(0, newStart), Math.max(0, newEnd));
}

function getAffectedLines(textarea: HTMLTextAreaElement): { affectedLines: number[]; lineStarts: number[] } {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const lines = textarea.value.split('\n');

  const affectedLines: number[] = [];
  const lineStarts: number[] = [];
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineStart = count;
    const lineEnd = count + lines[i].length + 1;
    lineStarts.push(lineStart);

    if (lineStart <= end && lineEnd > start) {
      affectedLines.push(i);
    }
    count = lineEnd;
  }

  return { affectedLines, lineStarts };
}

onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.style.height = `${MIN_HEIGHT}px`;
  }
});

watch(() => props.modelValue, () => {
  if (textareaRef.value) {
    autoResize(textareaRef.value);
  }
});
</script>

<template>
  <section class="panel input animate__animated animate__fadeInLeft" aria-label="Code input panel">
    <div class="code">
      <label for="source" class="visually-hidden">Enter your code here</label>
      <textarea
        id="source"
        ref="textareaRef"
        name="source"
        :value="modelValue"
        placeholder="Paste your code here..."
        autocomplete="off"
        spellcheck="false"
        autocorrect="off"
        autocapitalize="off"
        aria-describedby="input-hint"
        @input="handleInput"
        @paste="handlePaste"
        @keydown="handleKeyDown"
      ></textarea>
      <p id="input-hint" class="visually-hidden">
        Paste or type your code. Press Tab to indent, Shift+Tab to unindent.
      </p>
    </div>
  </section>
</template>

<style scoped>
.panel {
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

#source {
  box-sizing: border-box;
  width: 100%;
  resize: none;
  border: none;
  padding: 8px 10px;
  font-size: var(--code-font-size, 14px);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  border-radius: var(--panel-border-radius, 10px);
  z-index: 5;
  line-height: 1.5;
}

#source:focus {
  outline: 2px solid #4a90d9;
  outline-offset: -2px;
  box-shadow: 0px 0px 6px 0px inset rgba(10, 37, 64, 0.35);
}

#source.full {
  overflow-y: auto;
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
