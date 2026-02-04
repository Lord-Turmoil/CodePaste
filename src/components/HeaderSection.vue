<script setup lang="ts">
/**
 * HeaderSection - Logo and title header component
 */
defineEmits<{
  logoClick: [];
}>();
</script>

<template>
  <div
    class="header animate__animated animate__fadeInDown"
    title="Code Paste | Syntax Highlight for Office"
  >
    <span>Code</span>
    <span id="logo" @click="$emit('logoClick')"><img src="/res/logo.png" alt="Stir" /></span>
    <span>Paste</span>
  </div>
</template>

<style scoped>
.header {
  padding: 10px;
  text-align: center;
}

.header span {
  font-family: 'Lucida Handwriting';
  font-size: 3em;
  font-weight: bold;
}

.header span img {
  height: 1.7em;
  vertical-align: middle;
  margin: 0 5px;
}

#logo {
  cursor: pointer;
}
</style>
