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
  <div class="flip-wrapper">
    <button
      :id="id"
      type="button"
      class="flip-inner"
      :class="{ active }"
      :aria-pressed="active"
      :aria-label="active ? backLabel : frontLabel"
      @click="$emit('click')"
    >
      <div class="flip-front" :title="frontTitle">
        <i :class="frontIcon" aria-hidden="true"></i>
      </div>
      <div
        class="flip-back"
        :title="backTitle"
        :style="backColor ? { backgroundColor: backColor } : {}"
      >
        <i :class="backIcon" aria-hidden="true"></i>
      </div>
    </button>
  </div>
</template>

<style scoped>
.flip-wrapper {
  align-self: center;
  margin-left: 10px;
}

.flip-inner {
  width: 40px;
  height: 40px;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}

.flip-inner:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
  border-radius: 50%;
}

.flip-inner.active {
  transform: rotateY(180deg);
}

.flip-front,
.flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
}

.flip-front {
  background-color: #6c757d;
  color: white;
}

.flip-back {
  background-color: #007bff;
  color: white;
  transform: rotateY(180deg);
}

.flip-front:hover,
.flip-back:hover {
  opacity: 0.9;
}
</style>
