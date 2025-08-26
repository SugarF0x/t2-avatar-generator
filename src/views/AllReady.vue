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
        <h2 class="title">
          {{ t('title.1') }}
          <b>{{ t('title.2') }}</b>
        </h2>
        <p class="body">{{ t('body.1') }}</p>
        <p class="body">{{ t('body.2') }}</p>
        <p class="body">{{ t('body.3') }}</p>
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

  b {
    color: initial;
  }
}

.body {
  font-size: 10px;
  text-align: center;
  font-family: "T2 Rooftop Regular", "Roboto Light", sans-serif;

  @include large {
    font-size: 33px;
  }

  &:last-child {
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
title.1: ГОТОВО!
title.2: ВЫ ПРЕКРАСНЫ!
body.1: Осталось только поставить вашу новую аватарку в своем Telegram.
body.2: Спасибо вам за этот чудесный год, все совместные достижения и эмоции. Мы не умеем предсказывать будущее, но уверены — дальше будет еще круче.
body.3: "А вот и те, кто уже поддержал важное для нашего бренда событие:"
</i18n>

<i18n locale="en">
title.1: ALL DONE!
title.2: YOU ARE FABULOUS!
body.1: Now all that’s left is to set your new avatar in Telegram.
body.2: Thank you for this wonderful year, for every achievement and shared emotion. We can’t predict the future, but we’re sure — the best is yet to come
body.3: "And here are the ones who’ve already supported this milestone for our brand:"
</i18n>
