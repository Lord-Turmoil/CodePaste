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
  <button
    :id="id"
    type="button"
    class="action animate__animated animate__flipInY"
    :class="{ [animationClass || '']: isAnimating && animationClass }"
    :title="title"
    :aria-label="ariaLabel || title"
    @click="handleClick(); $emit('click')"
    @animationend="handleAnimationEnd"
  >
    <i :class="icon" aria-hidden="true"></i>
  </button>
</template>

<style scoped>
.action {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  background-color: #6c757d;
  color: white;
  margin: 5px;
}

.action:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.action:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}

.action i {
  font-size: 24px;
}

/* Animation classes */
.animate__spin i {
  animation: spin 0.5s ease forwards;
}

.animate__grow i {
  animation: grow 0.5s ease forwards;
}

.animate__shake i {
  animation: shake 0.5s ease forwards;
}

.animate__rubber i {
  animation: rubber 0.5s ease forwards;
}

.animate__tada i {
  animation: tada 0.5s ease forwards;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes grow {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(0.8);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

@keyframes rubber {
  0% {
    transform: scaleX(1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes tada {
  0% {
    transform: scale(1.1);
  }
  10%,
  20% {
    transform: scale(1) rotate(-3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale(1.2) rotate(3deg);
  }
  40%,
  60%,
  80% {
    transform: scale(1.2) rotate(-3deg);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
