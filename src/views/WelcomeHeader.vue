<script setup lang="ts">
import T2Logo from '@/assets/images/logo-black.svg'
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<template>
  <section id="header">
    <div class="toolbar">
      <img :src="T2Logo" alt="logo">
      <div class="bar" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins';

.toolbar {
  flex-direction: row;
  align-items: center;

  gap: 11px;

  @include large {
    gap: 38px;
  }

  img {
    height: 25px;

    @include large {
      height: 95px;
    }
  }
}

.bar {
  background-color: var(--t2-pink);
  flex-grow: 1;

  height: 32px;
  border-radius: 10px;


  @include large {
    height: 124px;
    border-radius: 30px;
  }
}
</style>

<i18n>
ru:
  title.1: хотим разделить
  title.2: с вами важное
  body.1: "Сегодня произошло крупное обновление: бренд Tele2 стал t2!\nКачество связи осталось, изменился только визуальный стиль"
  body.2: Предлагаем сменить аватарку в телеграм на 1 день
  cta.ready: я готов!
</i18n>
