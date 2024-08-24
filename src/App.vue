<script setup lang="ts">
import WelcomeHeader from "@/views/WelcomeHeader.vue"
import ColorPicker from "@/views/ColorPicker.vue"
import AvatarEditor from "@/views/AvatarEditor.vue"
import YouRock from "@/views/YouRock.vue"
import ColorSwitch from "@/components/ColorSwitch.vue"
</script>

<template>
  <div style="flex-direction: row; justify-content: space-between; padding: 24px;">
    <button class="t2">i am button</button>
    <button class="t2 dark">i am button</button>
    <button class="t2" disabled>i am button</button>
  </div>
  <div style="flex-direction: row; justify-content: space-between; padding: 24px;">
    <color-switch />
    <color-switch class="dark" />
    <color-switch class="dark" style="opacity: 0;" />
  </div>

  <welcome-header />
<!--  <color-picker />-->
<!--  <avatar-editor />-->
<!--  <you-rock />-->
</template>

<style lang="scss" scoped>

</style>
