<script setup lang="ts">
import Konva from "konva"
import { onMounted, watch } from "vue"
import BlackTemplateSource from '@/assets/images/shape-logo-black.svg'
import WhiteTemplateSource from '@/assets/images/shape-logo-white.svg'
import Color from '@/services/color'
import Upload from "@/services/upload.ts"

function loadImage(src: string) {
  return new Promise<HTMLImageElement>(resolve => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = src
  })
}

const images = Promise.all([
  loadImage(BlackTemplateSource),
  loadImage(WhiteTemplateSource)
])

let stageExport: undefined | Konva.Stage
let controllerExport: undefined | Konva.Transformer

function exportData() {
  controllerExport?.opacity(0)
  const data = stageExport?.toDataURL()
  controllerExport?.opacity(1)

  if (!data) return
  const link = document.createElement("a")
  link.download = 'avatar.png'
  link.href = data
  link.click()
}

onMounted(async () => {
  const [BlackTemplate, WhiteTemplate] = await images

  const SIZE = 512

  const stage = new Konva.Stage({
    container: 'konva',
    width: SIZE,
    height: SIZE,
  })
  stageExport = stage

  const layers = [
    new Konva.Layer({ clipFunc: ctx => void ctx.arc(stage.width() / 2, stage.width() / 2, stage.width() / 2, 0, Math.PI * 2, false) }),
    new Konva.Layer({ listening: false }),
    new Konva.Layer()
  ]

  layers.forEach(layer => stage.add(layer))
  const [photoLayer, templateLayer, controlsLayer] = layers

  const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: 'black'
  })
  photoLayer.add(background)

  const photoGroup = new Konva.Group()
  photoLayer.add(photoGroup)

  const mirrorGroup = new Konva.Group()
  photoGroup.add(mirrorGroup)

  const controls = new Konva.Transformer({
    centeredScaling: true,
    rotateEnabled: false,
    flipEnabled: false,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  })
  controlsLayer.add(controls)
  controllerExport = controls

  controls.on('transform', () => {
    const controlPhoto = photoGroup.children[1]

    mirrorGroup.scaleX(controlPhoto.scaleX())
    mirrorGroup.scaleY(controlPhoto.scaleY())
  });

  const templateImage = new Konva.Image({
    image: WhiteTemplate,
    width: stage.width(),
    height: stage.height(),
  })
  templateLayer.add(templateImage)

  const hideTemplate = () => { templateImage.opacity(.8) }
  const showTemplate = () => { templateImage.opacity(1) }

  photoGroup.on('dragstart', hideTemplate)
  photoGroup.on('dragend', showTemplate)
  controls.on('transformstart', hideTemplate)
  controls.on('transformend', showTemplate)

  watch(Color.isBlack, isBlack => {
    if (isBlack) {
      templateImage.image(BlackTemplate)
      background.fill('white')
    } else {
      templateImage.image(WhiteTemplate)
      background.fill('black')
    }
  }, { immediate: true })

  watch(Upload.data, imageData => {
    if (!imageData) return

    photoGroup.draggable(true)
    controls.nodes([])
    photoGroup.children = [mirrorGroup]
    mirrorGroup.children.length = 0
    mirrorGroup.scaleX(1)
    mirrorGroup.scaleY(1)

    const image = new Image()

    image.onload = () => {
      const { width, height } = image

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const konvaImage = (
            new Konva.Image({
              image: image,
              x: width * x - x,
              y: height * y - y,
              offsetX: width / 2,
              offsetY: height / 2,
              scaleX: Math.pow(-1, x + 2),
              scaleY: Math.pow(-1, y + 2)
            })
          )

          if (!x && !y) photoGroup.add(konvaImage)
          else mirrorGroup.add(konvaImage)
        }
      }

      controls.nodes([photoGroup.children[1]])

      const xScale = (stage.width() * .9) / width
      const yScale = (stage.height() * .9) / height
      const startingScale = Math.min(xScale, yScale)

      photoGroup.scaleX(startingScale)
      photoGroup.scaleY(startingScale)
      photoGroup.offsetX(photoGroup.width() / 2)
      photoGroup.offsetY(photoGroup.height() / 2)
      photoGroup.x(stage.width() / 2)
      photoGroup.y(stage.height() / 2)
    }

    image.src = imageData
  })

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

defineExpose({ exportData })
</script>

<template>
  <div id="konva" />
</template>

<style lang="scss">
@import '@/assets/styles/mixins';

#konva {
  width: 256px;
  height: 256px;

  @include large {
    width: 512px;
    height: 512px;
  }

  & > div {
    transform-origin: top left;
  }
}
</style>
