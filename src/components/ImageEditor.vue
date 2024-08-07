<script setup lang="ts">
import Konva from "konva"
import { onMounted } from "vue"
import ImageTemplate from '@/assets/images/t2-logo-crop.svg'
import AvatarExample from '@/assets/images/avatar-example.jpg'

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
  <div id="konva" />
</template>

<style scoped lang="scss">

</style>
