<script setup lang="ts">
/**
 * BannerSection - Welcome marquee banner
 */
</script>

<template>
  <div class="banner" role="complementary" aria-label="Welcome message">
    <marquee behavior="scroll" direction="left" aria-live="polite">
      <p>Welcome to Tony's Code Paste!</p>
    </marquee>
  </div>
</template>

<style scoped>
.banner {
  margin: 5px 0;
}

.banner p {
  margin: 0;
}
</style>
