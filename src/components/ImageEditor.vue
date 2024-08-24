<script setup lang="ts">
import Konva from "konva"
import { onMounted } from "vue"
import ImageTemplate from '@/assets/images/shape-logo-white.svg'
import AvatarExample from '@/assets/images/avatar-example.jpg'

// TODO: fix initial load having no image size fucking up calculations
const [TemplateImage, AvatarImage] = [ImageTemplate, AvatarExample].map(path => {
  const image = new Image()
  image.src = path
  return image
})

onMounted(() => {
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

  const photo = new Konva.Image({
    image: AvatarImage,
    draggable: true,
    x: (stage.width() - AvatarImage.width) / 2,
    y: (stage.height() - AvatarImage.height) / 2,
  })
  photoLayer.add(photo)

  const controls = new Konva.Transformer({
    nodes: [photo],
    centeredScaling: true,
    rotateEnabled: false,
    flipEnabled: false,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
  })
  controlsLayer.add(controls)

  const templateImage = new Konva.Image({
    image: TemplateImage,
    width: stage.width(),
    height: stage.height(),
  })
  templateLayer.add(templateImage)

  const hideTemplate = () => { templateImage.opacity(.8) }
  const showTemplate = () => { templateImage.opacity(1) }

  photo.on('dragstart', hideTemplate)
  photo.on('dragend', showTemplate)
  controls.on('transformstart', hideTemplate)
  controls.on('transformend', showTemplate)
})
</script>

<template>
  <div id="konva" />
</template>

<style scoped lang="scss">

</style>
