<script setup lang="ts">
import Konva from "konva"
import { onMounted, watch } from "vue"
import BlackTemplateSource from '@/assets/images/shape-logo-black.svg'
import WhiteTemplateSource from '@/assets/images/shape-logo-white.svg'
import AvatarExample from '@/assets/images/avatar-example.jpg'
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
  loadImage(WhiteTemplateSource),
  loadImage(AvatarExample),
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
  const [BlackTemplate, WhiteTemplate, AvatarImage] = await images

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

  const photoGroup = new Konva.Group({
    offsetX: (AvatarImage.width * 3 / 2),
    offsetY: (AvatarImage.height * 3 / 2),
    x: (AvatarImage.width * 3 / 2),
    y: (AvatarImage.height * 3 / 2),
  })
  photoLayer.add(photoGroup)

  const controls = new Konva.Transformer({
    centeredScaling: true,
    rotateEnabled: false,
    flipEnabled: false,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  })
  controlsLayer.add(controls)
  controllerExport = controls

  controls.on('transform', () => {
    const scaleXDelta = photoGroup.children[4].scaleX() - 1
    const scaleYDelta = photoGroup.children[4].scaleY() - 1

    photoGroup.children[4].scaleX(1)
    photoGroup.children[4].scaleY(1)

    const newScaleX = photoGroup.scaleX() + scaleXDelta / 3
    const newScaleY = photoGroup.scaleY() + scaleYDelta / 3

    if (newScaleX < .1 || newScaleY < .1) return

    photoGroup.scaleX(photoGroup.scaleX() + scaleXDelta / 3)
    photoGroup.scaleY(photoGroup.scaleY() + scaleYDelta / 3)
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
    photoGroup.children.length = 0

    const image = new Image()

    // TODO: overlap photos a bit to fix black connective lines
    // TODO: cap max width and height to stage size
    image.onload = () => {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          photoGroup.add(
            new Konva.Image({
              image: image,
              x: stage.width() / 2 + image.width * x,
              y: stage.height() / 2 + image.height * y,
              offsetX: image.width / 2,
              offsetY: image.height / 2,
              scaleX: Math.pow(-1, x + 2),
              scaleY: Math.pow(-1, y + 2)
            })
          )
        }
      }

      controls.nodes([photoGroup.children[4]])
    }

    image.src = imageData
  })

  // TODO: fix resize reducing image size to 256, perhaps by setting width and height to the element and not the canvas entity
  function resize() {
    if (window.innerWidth < 650) {
      stage.scale({ x: .5, y: .5 })
      stage.width(SIZE * .5)
      stage.height(SIZE * .5)
      photoLayer.scale({ x: 2, y: 2 })
    } else {
      stage.scale({x: 1, y: 1})
      stage.width(SIZE)
      stage.height(SIZE)
      photoLayer.scale({ x: 1, y: 1 })
    }
  }

  window.addEventListener('resize', resize)
  resize()
})

defineExpose({ exportData })
</script>

<template>
  <div id="konva" />
</template>

<style scoped lang="scss">

</style>
