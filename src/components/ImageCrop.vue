<script setup lang="ts">
import Upload from "@/services/upload.ts"
import { computed, onMounted, ref, watch } from "vue"
import Konva from "konva"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const isVisible = computed(() => !Upload.data.value && !!Upload.rawData.value)

function abort() {
  Upload.rawData.value = null
}

const image = ref(new Image())
watch(Upload.rawData, value => {
  if (!value) {
    image.value = new Image()
    return
  }

  const newImage = new Image()
  newImage.onload = () => image.value = newImage
  newImage.src = value
}, { immediate: true })

const cropFunc = ref<() => void>(() => {})

onMounted(() => {
  const SIZE = 512

  const stage = new Konva.Stage({
    container: 'konva-crop',
    width: SIZE,
    height: SIZE,
  })

  const imageLayer = new Konva.Layer()
  stage.add(imageLayer)

  const controlsLayer = new Konva.Layer()
  stage.add(controlsLayer)

  const darkOverlay = new Konva.Rect({
    x: 0,
    y: 0,
    fill: 'rgba(0, 0, 0, .5)',
  })
  controlsLayer.add(darkOverlay)

  function resizeDarkOverlay() {
    darkOverlay.width(stage.width())
    darkOverlay.height(stage.height())
  }
  resizeDarkOverlay()

  const cropRect = new Konva.Rect({
    fill: 'red',
    draggable: true,
    globalCompositeOperation: 'destination-out',
  })
  controlsLayer.add(cropRect)

  function resizeCropRect() {
    cropRect.x(stage.width() * .05)
    cropRect.y(stage.width() * .05)
    cropRect.width(stage.width() * .9)
    cropRect.height(stage.height() * .9)
  }
  resizeCropRect()

  const controls = new Konva.Transformer({
    nodes: [cropRect],
    rotateEnabled: false,
    keepRatio: false
  })
  controlsLayer.add(controls)

  let konvaImage: Konva.Image | undefined = undefined

  watch(image, image => {
    imageLayer.children.length = 0
    const { width, height } = image
    if (!width && !height) return

    const aspectRatio = height / width
    const konvaElement = document.querySelector('#konva-crop') as HTMLDivElement

    konvaElement.style.setProperty('--aspect-ratio', String(aspectRatio))
    stage.height(SIZE * aspectRatio)
    resizeDarkOverlay()

    cropRect.scaleX(1)
    cropRect.scaleY(1)
    resizeCropRect()

    const xScale = stage.width() / width
    const yScale = stage.height() / height
    const imageScale = Math.min(xScale, yScale)

    konvaImage = new Konva.Image({
      image,
      scaleX: imageScale,
      scaleY: imageScale,
    })
    imageLayer.add(konvaImage)
  })

  function crop() {
    if (!konvaImage) return

    const cropX = cropRect.x() / konvaImage.scaleX()
    const cropY = cropRect.y() / konvaImage.scaleY()
    const cropWidth = cropRect.width() * cropRect.scaleX() / konvaImage.scaleX()
    const cropHeight = cropRect.height() * cropRect.scaleY() / konvaImage.scaleY()

    konvaImage.crop({
      x: cropX,
      y: cropY,
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

  function resize() {
    const { style } = stage.getContent()
    const isSmall = Number(window.innerWidth < 650)

    style.scale = String(1 - Number(isSmall) * .5)

    controls.anchorStrokeWidth(1 + Number(isSmall) * 4)
    controls.borderStrokeWidth(1 + Number(isSmall) * 4)
    controls.anchorSize(10 + Number(isSmall) * 20)
  }

  window.addEventListener('resize', resize)
  resize()
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
// TODO: limit the max size
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

<style lang="scss">
@import '@/assets/styles/mixins';

#konva-crop {
  --aspect-ratio: 1;

  width: 256px;
  height: calc(256px * var(--aspect-ratio));

  @include large {
    width: 512px;
    height: calc(512px * var(--aspect-ratio));
  }

  & > div {
    transform-origin: top left;
  }
}
</style>

<i18n>
ru:
  cta.ready: Обрезать
</i18n>
