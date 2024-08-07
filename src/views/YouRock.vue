<script setup lang="ts">
import Image1 from "@/assets/images/processed-examples/1.png"
import Image2 from "@/assets/images/processed-examples/2.png"
import Image3 from "@/assets/images/processed-examples/3.png"
import Image4 from "@/assets/images/processed-examples/4.png"
import Image5 from "@/assets/images/processed-examples/5.png"

const images = [Image1, Image2, Image3, Image4, Image5]
</script>

<template>
  <section id="you-rock">
    <div class="title">
      Готово,
      <br>
      <span style="color: var(--t2-green)">Вы великолепны!</span>
    </div>
    <p>Ваша идеальная аватарка готова, осталось поставить ее в своем Telegram</p>
    <p style="color: var(--t2-green)">Мы благодарим вас за поддержку и хотим познакомить с теми, кто тоже решил поддержать важное событие для нашего бренда!</p>
    <div class="carousel">
      <img v-for="image of images" :key="image" :src="image" alt="example">
    </div>
  </section>
</template>

<style scoped lang="scss">
#you-rock {
  gap: calc(100vw / 38.4);
}

.carousel {
  flex-direction: row;
  gap: calc(100vw / 64);

  img {
    width: calc(100vw / 6.2);
    aspect-ratio: 1;
  }
}
</style>
