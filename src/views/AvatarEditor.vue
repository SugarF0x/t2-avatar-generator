<script setup lang="ts">
import CornerCross from "@/assets/images/corner-cross.svg"
import ImageEditor from "@/components/ImageEditor.vue"
import Metrics from "@/services/metrics.ts"

function handleCreation() {
  Metrics.log(Metrics.ID.GENERATE_AVATAR)
}
</script>

<template>
  <section id="editor">
    <div class="container">
      <div class="band">
        <img :src="CornerCross" alt="cross.svg">
        <img :src="CornerCross" alt="cross.svg">
      </div>

      <div class="content">
        <image-editor />
        <div class="text-container">
          <p>Вы можете менять расположение, поворачивать, увеличивать или уменьшать так, как вам нравится!</p>
          <button class="t2" @click="handleCreation">скачать</button>
        </div>
      </div>

      <div class="band">
        <img :src="CornerCross" alt="cross.svg">
        <img :src="CornerCross" alt="cross.svg">
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.band {
  flex-direction: row;
  justify-content: space-between;
}

.content {
  flex-direction: row;
  gap: calc(1920px / 20);
}

.text-container {
  gap: calc(1920px / 26);
}
</style>
