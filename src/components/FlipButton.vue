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

<style scoped>
.flip-wrapper {
  width: 2em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  transition: opacity 0.2s;
  padding: 5px;
  cursor: pointer;
  align-self: center;
  margin-left: 10px;
}

.flip-wrapper:hover {
  opacity: 80%;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.3s;
  transform-style: preserve-3d;
}

.flip-wrapper .active {
  transform: rotateY(180deg);
}

.flip-wrapper .flip-inner .flip-front,
.flip-wrapper .flip-inner .flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
}

.flip-wrapper .flip-inner .flip-front {
  background-color: #bbb;
  color: black;
}

.flip-wrapper .flip-inner .flip-back {
  background-color: #FF69B4;
  color: white;
  transform: rotateY(180deg);
}
</style>
