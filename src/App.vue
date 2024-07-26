<script setup lang="ts">
import Konva from "konva"
import { onMounted } from "vue"
import ImageTemplate from '@/assets/image-template.svg'
import AvatarExample from '@/assets/avatar-example.jpg'

const [TemplateImage, AvatarImage] = [ImageTemplate, AvatarExample].map(path => {
  const image = new Image()
  image.src = path
  return image
})

onMounted(() => {
  const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const layers = [new Konva.Layer(), new Konva.Layer({ listening: false }), new Konva.Layer()]
  layers.forEach(layer => stage.add(layer))
  const [photoLayer, templateLayer, controlsLayer] = layers

  const photo = new Konva.Image({
    image: AvatarImage,
    draggable: true,
  })
  photoLayer.add(photo)

  const controls = new Konva.Transformer({
    nodes: [photo],
    centeredScaling: true,
  })
  controlsLayer.add(controls)

  const templateImage = new Konva.Image({
    image: TemplateImage,
  })
  templateLayer.add(templateImage)
})
</script>

<template>
  <div id="container">
    i am some component in the ass
  </div>
</template>

<style lang="scss">
html, body {
  margin: 0;
  min-height: 100vh;
  min-width: 100vw;
}

body, body * {
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss" scoped>

</style>
