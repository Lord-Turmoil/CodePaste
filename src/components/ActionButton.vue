<script setup lang="ts">
/**
 * ActionButton - Circular action button with animation
 */
import { ref } from 'vue';

interface ActionButtonProps {
  id: string;
  icon: string;
  title: string;
  ariaLabel?: string;
  animationClass?: string;
}

const props = withDefaults(defineProps<ActionButtonProps>(), {
  ariaLabel: '',
  animationClass: '',
});

defineEmits<{
  click: [];
}>();

const isAnimating = ref(false);

function handleClick(): void {
  if (props.animationClass) {
    isAnimating.value = true;
  }
}

function handleAnimationEnd(): void {
  isAnimating.value = false;
}
</script>

<template>
  <div
    :id="id"
    class="action animate__animated animate__flipInY"
    :class="{ [animationClass || '']: isAnimating && animationClass }"
    :title="title"
    @click="handleClick(); $emit('click')"
    @animationend="handleAnimationEnd"
  >
    <i :class="icon"></i>
  </div>
</template>
