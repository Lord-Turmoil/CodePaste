<script setup lang="ts">
/**
 * LineNumberToggle - Toggle switch for line numbers
 */
defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<template>
  <div class="tool">
    <div class="prompt">
      <span>Line Number</span>
    </div>
    <div class="checkbox-wrapper-8" title="Toggle line number">
      <input
        id="cb3-8"
        class="tgl tgl-skewed"
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <label
        class="tgl-btn"
        data-tg-off="OFF"
        data-tg-on="ON"
        for="cb3-8"
      ></label>
    </div>
  </div>
</template>
