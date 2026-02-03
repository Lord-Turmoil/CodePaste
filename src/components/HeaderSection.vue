<script setup lang="ts">
/**
 * HeaderSection - Logo and title header component
 */
defineEmits<{
  logoClick: [];
}>();
</script>

<template>
  <header
    class="header animate__animated animate__fadeInDown"
    role="banner"
  >
    <h1 class="header-title">
      <span>Code</span>
      <button
        id="logo"
        type="button"
        class="logo-button"
        aria-label="Show notification"
        @click="$emit('logoClick')"
      >
        <img src="/res/logo.png" alt="" aria-hidden="true" />
      </button>
      <span>Paste</span>
    </h1>
    <p class="visually-hidden">Syntax Highlight for Office - Code highlighting tool for Microsoft Word and PowerPoint</p>
  </header>
</template>

<style scoped>
.header {
  padding: 10px;
  text-align: center;
}

.header-title {
  font-family: 'Lucida Handwriting', cursive;
  font-size: 3em;
  font-weight: bold;
  margin: 0;
  display: inline-flex;
  align-items: center;
}

.header-title span {
  font-family: inherit;
  font-size: 1em;
}

.logo-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 5px;
  display: inline-flex;
  align-items: center;
}

.logo-button img {
  height: 1.7em;
  vertical-align: middle;
}

.logo-button:hover {
  opacity: 0.8;
}

.logo-button:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
  border-radius: 4px;
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
</style>
