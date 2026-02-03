<script setup lang="ts">
/**
 * FlipButton - Animated toggle button with flip effect
 */
defineProps<{
  id: string;
  active: boolean;
  frontIcon: string;
  backIcon: string;
  frontTitle: string;
  backTitle: string;
  frontLabel: string;
  backLabel: string;
  backColor?: string;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <div class="flip-wrapper" @click="$emit('click')">
    <div
      :id="id"
      class="flip-inner"
      :class="{ active }"
    >
      <div class="flip-front" :title="frontTitle">
        <i :class="frontIcon"></i>
      </div>
      <div
        class="flip-back"
        :title="backTitle"
        :style="backColor ? { backgroundColor: backColor } : {}"
      >
        <i :class="backIcon"></i>
      </div>
    </div>
  </div>
</template>
