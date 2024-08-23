<script setup lang="ts">
import Color from '@/services/color'
</script>

<template>
  <label class="color-switch">
    <input v-model="Color.isBlack.value" type="checkbox">
    <span class="bullet"></span>
  </label>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins';

.color-switch {
  --translation-duration: .4s;

  --width: 130px;
  --height: 44px;
  --border-radius: 30px;
  --bullet-size: 38px;
  --bullet-outline-size: 1px;

  @include large {
    --width: 400px;
    --height: 135px;
    --border-radius: 70px;
    --bullet-size: 114px;
    --bullet-outline-size: 4px;
  }

  --padding: calc((var(--height) - var(--bullet-size)) / 2);
  --translation-target: calc((var(--width) - var(--bullet-size) - var(--padding) * 2));

  width: var(--width);
  height: var(--height);
  position: relative;
  user-select: none;

  & .bullet {
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    background: var(--highlight-color);
    transition: var(--translation-duration);
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;

    &:before {
      top: var(--padding);
      left: var(--padding);
      width: var(--bullet-size);
      height: var(--bullet-size);
      transition: var(--translation-duration);
      border: var(--bullet-outline-size) solid black;
      content: '';
      position: absolute;
      display: inline-block;
      border-radius: 50%;
      background: white;
      box-sizing: border-box;
    }

    &:after {
      --padding-inner: calc(var(--padding) * 2);
      --bullet-size-inner: calc(var(--bullet-size) - var(--padding-inner));

      top: var(--padding-inner);
      left: var(--padding-inner);
      width: var(--bullet-size-inner);
      height: var(--bullet-size-inner);
      border: var(--bullet-outline-size) solid black;
      transition: var(--translation-duration);
      content: '';
      position: absolute;
      display: inline-block;
      border-radius: 50%;
      background: white;
      box-sizing: border-box;
    }
  }

  input[type=checkbox] {
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked + .bullet:before,
    &:checked + .bullet:after {
      transform: translateX(var(--translation-target));
    }

    &:checked + .bullet:after { background-color: black; }
  }
}
</style>
