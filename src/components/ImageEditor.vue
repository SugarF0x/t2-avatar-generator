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

  const stage = new Konva.Stage({
    container: 'konva',
    width: 512,
    height: 512,
  })

  const layers = [
    new Konva.Layer({ clipFunc: ctx => void ctx.arc(stage.width() / 2, stage.width() / 2, stage.width() / 2, 0, Math.PI * 2, false) }),
    new Konva.Layer({ listening: false }),
    new Konva.Layer()
  ]

  layers.forEach(layer => stage.add(layer))
  const [photoLayer, templateLayer, controlsLayer] = layers

  const photoGroup = new Konva.Group({ draggable: true })
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
    nodes: [photoGroup],
    centeredScaling: true,
    rotateEnabled: false,
    flipEnabled: false,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    // scale: { x: 1/3, y: 1/3 },
    // offset: { x: -AvatarImage.width * 3, y: -AvatarImage.height * 3 },
    // borderStrokeWidth: 3,
    // anchorSize: 30,
    // anchorStrokeWidth: 3,
  })
  controlsLayer.add(controls)

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
    if (isBlack) templateImage.image(BlackTemplate)
    else templateImage.image(WhiteTemplate)
  }, { immediate: true })
})
</script>

<template>
  <div id="konva" />
</template>

<style scoped lang="scss">

</style>
