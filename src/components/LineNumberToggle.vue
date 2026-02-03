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
    <span id="line-number-label" class="prompt">Line Number</span>
    <div class="checkbox-wrapper-8" title="Toggle line number display">
      <input
        id="line-number-toggle"
        class="tgl tgl-skewed"
        type="checkbox"
        :checked="modelValue"
        role="switch"
        aria-labelledby="line-number-label"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <label
        class="tgl-btn"
        data-tg-off="OFF"
        data-tg-on="ON"
        for="line-number-toggle"
      ></label>
    </div>
  </div>
</template>

<style scoped>
.tool {
  align-self: center;
  display: flex;
  flex-direction: row;
  margin: 5px;
}

.tool > div,
.tool > span {
  margin: 0 5px;
  align-self: center;
}

.prompt {
  font-weight: 500;
}

/* Toggle switch styles */
.checkbox-wrapper-8 .tgl {
  display: none;
}

.checkbox-wrapper-8 .tgl,
.checkbox-wrapper-8 .tgl:after,
.checkbox-wrapper-8 .tgl:before,
.checkbox-wrapper-8 .tgl *,
.checkbox-wrapper-8 .tgl *:after,
.checkbox-wrapper-8 .tgl *:before,
.checkbox-wrapper-8 .tgl + .tgl-btn {
  box-sizing: border-box;
}

.checkbox-wrapper-8 .tgl::-moz-selection,
.checkbox-wrapper-8 .tgl:after::-moz-selection,
.checkbox-wrapper-8 .tgl:before::-moz-selection,
.checkbox-wrapper-8 .tgl *::-moz-selection,
.checkbox-wrapper-8 .tgl *:after::-moz-selection,
.checkbox-wrapper-8 .tgl *:before::-moz-selection,
.checkbox-wrapper-8 .tgl + .tgl-btn::-moz-selection,
.checkbox-wrapper-8 .tgl::selection,
.checkbox-wrapper-8 .tgl:after::selection,
.checkbox-wrapper-8 .tgl:before::selection,
.checkbox-wrapper-8 .tgl *::selection,
.checkbox-wrapper-8 .tgl *:after::selection,
.checkbox-wrapper-8 .tgl *:before::selection,
.checkbox-wrapper-8 .tgl + .tgl-btn::selection {
  background: none;
}

.checkbox-wrapper-8 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 4em;
  height: 2em;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.checkbox-wrapper-8 .tgl + .tgl-btn:after,
.checkbox-wrapper-8 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}

.checkbox-wrapper-8 .tgl + .tgl-btn:after {
  left: 0;
}

.checkbox-wrapper-8 .tgl + .tgl-btn:before {
  display: none;
}

.checkbox-wrapper-8 .tgl:checked + .tgl-btn:after {
  left: 50%;
}

.checkbox-wrapper-8 .tgl-skewed + .tgl-btn {
  overflow: hidden;
  transform: skew(-10deg);
  backface-visibility: hidden;
  transition: all 0.2s ease;
  font-family: sans-serif;
  background: #888;
}

.checkbox-wrapper-8 .tgl-skewed + .tgl-btn:after,
.checkbox-wrapper-8 .tgl-skewed + .tgl-btn:before {
  transform: skew(10deg);
  display: inline-block;
  transition: all 0.2s ease;
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 2em;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}

.checkbox-wrapper-8 .tgl-skewed + .tgl-btn:after {
  left: 100%;
  content: attr(data-tg-on);
}

.checkbox-wrapper-8 .tgl-skewed + .tgl-btn:before {
  left: 0;
  content: attr(data-tg-off);
}

.checkbox-wrapper-8 .tgl-skewed + .tgl-btn:active {
  background: #888;
}

.checkbox-wrapper-8 .tgl-skewed + .tgl-btn:active:before {
  left: -10%;
}

.checkbox-wrapper-8 .tgl-skewed:checked + .tgl-btn {
  background: #86d993;
}

.checkbox-wrapper-8 .tgl-skewed:checked + .tgl-btn:before {
  left: -100%;
}

.checkbox-wrapper-8 .tgl-skewed:checked + .tgl-btn:after {
  left: 0;
}

.checkbox-wrapper-8 .tgl-skewed:checked + .tgl-btn:active:after {
  left: 10%;
}

/* Focus styles for accessibility */
.checkbox-wrapper-8 .tgl:focus + .tgl-btn {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}

@media screen and (max-width: 950px) {
  .tool {
    align-self: flex-start;
  }

  .tool .prompt {
    width: 8em;
    text-align: right;
  }
}
</style>
