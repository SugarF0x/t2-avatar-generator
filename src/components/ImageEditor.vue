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
    width: window.innerWidth / 2.5,
    height: window.innerWidth / 2.5,
  })

  const layers = [new Konva.Layer(), new Konva.Layer({ listening: false }), new Konva.Layer()]
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
    x: (stage.width() - TemplateImage.width) / 2,
    y: (stage.height() - TemplateImage.height) / 2,
    opacity: .8,
  })
  templateLayer.add(templateImage)
})
</script>

<template>
  <div id="konva" />
</template>

<style scoped lang="scss">

</style>
