<script setup lang="ts">
import T2Logo from '@/assets/images/logo-black.svg'
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<template>
  <section id="header">
    <div class="title">
      <div>{{ t('title.1') }}</div>
      <div class="highlighted">{{ t('title.2') }}</div>
    </div>
    <div>{{ t('body.1') }}</div>
    <div class="highlighted">{{ t('body.2') }}</div>
    <div class="actions">
      <button class="t2">{{ t('cta.ready') }}</button>
      <img :src="T2Logo" alt="t2-logo">
    </div>
  </section>
</template>

<style scoped lang="scss">
#header {
  gap: calc(100vw / 38.4);
}

.highlighted {
  color: var(--t2-pink)
}

.actions {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
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
