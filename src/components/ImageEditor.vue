<script setup lang="ts">
import Konva from "konva"
import { onMounted, watch } from "vue"
import BlackTemplateSource from '@/assets/images/shape-logo-black.svg'
import WhiteTemplateSource from '@/assets/images/shape-logo-white.svg'
import AvatarExample from '@/assets/images/avatar-example.jpg'
import Color from '@/services/color'

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

onMounted(async () => {
  const [BlackTemplate, WhiteTemplate, AvatarImage] = await images

  const SIZE = 512

  const stage = new Konva.Stage({
    container: 'konva',
    width: SIZE,
    height: SIZE,
  })

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
    draggable: true,
    offsetX: (AvatarImage.width * 3 / 2),
    offsetY: (AvatarImage.height * 3 / 2),
    x: (AvatarImage.width * 3 / 2),
    y: (AvatarImage.height * 3 / 2),
  })
  photoLayer.add(photoGroup)

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      photoGroup.add(
        new Konva.Image({
          image: AvatarImage,
          x: stage.width() / 2 + AvatarImage.width * x,
          y: stage.height() / 2 + AvatarImage.height * y,
          offsetX: AvatarImage.width / 2,
          offsetY: AvatarImage.height / 2,
          scaleX: Math.pow(-1, x + 2),
          scaleY: Math.pow(-1, y + 2)
        })
      )
    }
  }

  const controls = new Konva.Transformer({
    nodes: [photoGroup.children[4]],
    centeredScaling: true,
    rotateEnabled: false,
    flipEnabled: false,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  })
  controlsLayer.add(controls)

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

  window.addEventListener('resize', () => {
    if (window.innerWidth < 650) {
      stage.scale({ x: .5, y: .5 })
      stage.width(SIZE * .5)
      stage.height(SIZE * .5)
      photoLayer.scale({ x: 2, y: 2 })
      photoGroup.scale({ x: .5, y: .5 })
    } else {
      stage.scale({x: 1, y: 1})
      stage.width(SIZE)
      stage.height(SIZE)
      photoLayer.scale({ x: 1, y: 1 })
      photoGroup.scale({ x: 1, y: 1 })
    }
  })
})
</script>

<template>
  <div id="konva" />
</template>

<style scoped lang="scss">

</style>
