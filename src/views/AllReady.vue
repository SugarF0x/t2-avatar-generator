<script setup lang="ts">
import Sample1 from '@/assets/images/processed-examples/1.png'
import Sample2 from '@/assets/images/processed-examples/2.png'
import Sample3 from '@/assets/images/processed-examples/3.png'
import Sample4 from '@/assets/images/processed-examples/4.png'
import Sample5 from '@/assets/images/processed-examples/5.png'
import Sample6 from '@/assets/images/processed-examples/6.png'
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const samples = [Sample1, Sample2, Sample3, Sample4, Sample5, Sample6]
</script>

<template>
  <section id="all-ready">
    <div class="container">
      <div class="text">
        <h2 class="title">{{ t('title') }}</h2>
        <p class="body">{{ t('body.1') }}</p>
        <p class="body">{{ t('body.2') }}</p>
      </div>
      <div class="samples">
        <img v-for="sample in samples" :key="sample" :src="sample" alt="sample">
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins';

.container {
  gap: 20px;

  @include large {
    gap: 70px;
  }
}

.text {
  gap: 10px;

  @include large {
    gap: 30px;
  }
}

.title {
  font-family: "T2 Halvar Breit", sans-serif;
  text-align: center;
  text-transform: uppercase;
  color: var(--t2-pink);

  font-size: 24px;

  @include large {
    font-size: 50px;
  }
}

.body {
  font-size: 10px;
  text-align: center;

  @include large {
    font-size: 33px;
  }

  & + & {
    color: var(--t2-pink);

    @include large {
      font-size: 30px;
    }
  }
}

.samples {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  gap: 10px;

  @include large {
    gap: 30px;
  }

  img {
    width: 100px;
    aspect-ratio: 1;

    @include large {
      width: 170px;
    }
  }
}
</style>

<i18n locale="ru">
title: ГОТОВО!
body.1: Ваше фото теперь на новом уровне. Сохраните его в фотоплёнку из загрузок браузера и поставьте на аватарку в своем Telegram
body.2: "Благодарим вас! А вот и те, кто уже поддержал ребрендинг t2:"
</i18n>

<i18n locale="en">
title: ALL DONE!
body.1: You photo is now on a new level. Move it to the Photos from your browser downloads and set it as your Telegram profile picture.
body.2: "Thank you! Here are the ones who have already supported t2 rebranding:"
</i18n>
