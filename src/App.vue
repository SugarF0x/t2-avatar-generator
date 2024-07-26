<script setup lang="ts">
import Konva from "konva"
import { onMounted } from "vue"

onMounted(() => {

  const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const layer = new Konva.Layer()
  stage.add(layer)

  const text1 = new Konva.Text({
    x: 50,
    y: 70,
    fontSize: 30,
    text: 'centeredScaling = true',
    draggable: true,
  })
  layer.add(text1)

  const tr1 = new Konva.Transformer({
    nodes: [text1],
    centeredScaling: true,
  })
  layer.add(tr1)

  const text2 = new Konva.Text({
    x: 50,
    y: 200,
    fontSize: 30,
    text: 'centeredScaling = false',
    draggable: true,
  })
  layer.add(text2)

  const tr2 = new Konva.Transformer({
    nodes: [text2],
    centeredScaling: false,
  })
  layer.add(tr2)
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
