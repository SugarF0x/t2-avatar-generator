<script setup lang="ts">
import LineArrow from "@/components/LineArrow.vue"
import { colors, colorIndex } from "@/store.ts"
import { useI18n } from "vue-i18n"
import ColorSwitch from "@/components/ColorSwitch.vue"

const { t } = useI18n()
</script>

<template>
  <section id="color-picker">
    <div class="container">
      <h2 class="title">{{ t('title') }}</h2>
      <div class="content">
        <table>
          <tr>
            <td>
              <span class="step">{{ t('step.1.title') }}</span>
              {{ t('step.1.description') }}
            </td>
            <td><line-arrow /></td>
            <td>
              <button class="t2 dark">{{ t('cta.photo') }}</button>
            </td>
          </tr>
          <tr>
            <td>
              <span class="step">{{ t('step.2.title') }}</span>
              {{ t('step.2.description') }}
            </td>
            <td><line-arrow /></td>
            <td>
              <color-switch class="dark" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins';

.step {
  color: var(--t2-green);
}

.container {
  font-size: 10px;
  gap: 20px;

  @include large {
    font-size: 33px;
    gap: 15px;
  }

  table {
    border-spacing: 10px;
    border-collapse: separate;
  }

  button {
    width: 100%;
    max-width: 400px;
  }
}

.title {
  color: black;
  background-color: var(--t2-green);
  font-family: "T2 Halvar Breit", sans-serif;
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  word-break: break-word;

  font-size: 24px;
  border-radius: 10px;
  padding: 4px 8px;

  @include large {
    font-size: 50px;
    border-radius: 30px;
    padding: 38px 64px;
  }
}

.content {
  background-color: #1E1E1E;

  border-radius: 7px;
  padding: 10px;

  @include large {
    border-radius: 30px;
    padding: 75px 50px;
  }
}
</style>

<i18n>
ru:
  title: воспользуйтесь конструктором
  step.1.title: 'Шаг 1:'
  step.1.description: выберите фото
  step.2.title: 'Шаг 2:'
  step.2.description: выберите цвет
  cta.photo: выбрать фото
</i18n>
