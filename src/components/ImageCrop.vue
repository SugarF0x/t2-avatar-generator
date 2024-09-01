<script setup lang="ts">
import Upload from "@/services/upload.ts"
import { computed, ref, watch } from "vue"
import Konva from "konva"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const isVisible = computed(() => !Upload.data.value && !!Upload.rawData.value)

function abort() {
  Upload.rawData.value = null
}

const image = ref(new Image())
watch(Upload.rawData, value => {
  if (!value) return

  const newImage = new Image()
  newImage.onload = () => image.value = newImage
  newImage.src = value
}, { immediate: true })

const cropFunc = ref<() => void>(() => {})

// TODO: move most logic to on mounted
watch(image, image => {
  if (!image) return

  const SIZE = 512

  const stage = new Konva.Stage({
    container: 'konva-crop',
    width: SIZE,
    height: SIZE,
  })

  const imageLayer = new Konva.Layer()
  stage.add(imageLayer)

  const konvaImage = new Konva.Image({ image: image })
  imageLayer.add(konvaImage)

  const controlsLayer = new Konva.Layer()
  stage.add(controlsLayer)

  const darkOverlay = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: 'rgba(0, 0, 0, .5)',
  })
  controlsLayer.add(darkOverlay)

  const cropRect = new Konva.Rect({
    x: stage.width() * .05,
    y: stage.width() * .05,
    width: stage.width() * .9,
    height: stage.height() * .9,
    fill: 'red',
    draggable: true,
    globalCompositeOperation: 'destination-out',
  })
  controlsLayer.add(cropRect)

  const tr = new Konva.Transformer({
    nodes: [cropRect],
    rotateEnabled: false,
    keepRatio: false
  })
  controlsLayer.add(tr)

  function crop() {
    const cropX = cropRect.x();
    const cropY = cropRect.y();
    const cropWidth = cropRect.width() * cropRect.scaleX();
    const cropHeight = cropRect.height() * cropRect.scaleY();

    konvaImage.crop({
      x: cropX - konvaImage.x(),
      y: cropY - konvaImage.y(),
      width: cropWidth,
      height: cropHeight,
    })

    konvaImage.width(cropWidth)
    konvaImage.height(cropHeight)
    konvaImage.x(cropX)
    konvaImage.y(cropY)

    Upload.data.value = konvaImage.toDataURL()
    Upload.rawData.value = null
  }

  cropFunc.value = crop
})
</script>

<template>
  <dialog id="crop-editor" :open="isVisible">
    <div class="container">
      <button class="t2 dark close" @click="abort">X</button>
      <div id="konva-crop" />
      <button class="t2 dark" @click="cropFunc">{{ t('cta.ready') }}</button>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
#crop-editor {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  padding: 0;
  border: none;
  background-color: rgba(0,0,0,.5);
  flex-direction: column;
  backdrop-filter: blur(16px);
  justify-content: center;
  align-items: center;

  &[open] {
    display: flex;
  }
}

.container {
  background-color: var(--t2-grey);
  border-radius: 24px;
  padding: 24px;
  gap: 16px;
}

button.close {
  margin-left: auto;
  padding: 4px 8px;
}
</style>

<i18n>
ru:
  cta.ready: Обрезать
</i18n>
