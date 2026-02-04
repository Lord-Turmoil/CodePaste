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

<style scoped>
.action {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  align-self: center;
  cursor: pointer;
  transition: 0.3s;
  background-color: #bbb;
}

.action:hover {
  opacity: 80%;
  transform: scale(1.1);
}

.action i {
  align-self: center;
  font-size: 30px;
  color: #181a1b;
}

/* Animation classes */
.animate__spin i {
  animation: spin 0.5s ease 0s forwards;
}

.animate__grow i {
  animation: grow 0.5s ease 0s forwards;
}

.animate__shake i {
  animation: shake 0.5s ease 0s forwards;
}

.animate__rubber i {
  animation: rubber 0.5s ease 0s forwards;
}

.animate__blink i {
  animation: tada 0.5s ease 0s forwards;
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
    transform: scale(1.0);
  }
  20% {
    transform: scale(0.8);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.0);
  }
}

@keyframes shake {
  0%, to {
    transform: translateZ(0);
  }
  20%, 60% {
    transform: translate3d(-5px, 0, 0);
  }
  40%, 80% {
    transform: translate3d(5px, 0, 0);
  }
}

@keyframes rubber {
  0% {
    transform: scaleX(1);
  }
  30% {
    transform: scale3d(1.25, .75, 1);
  }
  40% {
    transform: scale3d(.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, .85, 1);
  }
  65% {
    transform: scale3d(.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, .95, 1);
  }
  to {
    transform: scale(1);
  }
}

@keyframes tada {
  0% {
    transform: scaleX(1.1);
  }
  10%, 20% {
    transform: scale3d(1.0, 1.0, 1.0) rotate(-3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale3d(1.2, 1.2, 1.2) rotate(3deg);
  }
  40%, 60%, 80% {
    transform: scale3d(1.2, 1.2, 1.2) rotate(-3deg);
  }
  to {
    transform: scaleX(1.1);
  }
}
</style>
