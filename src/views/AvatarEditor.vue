<script setup lang="ts">
import LineArrow from "@/components/LineArrow.vue"
import { useI18n } from "vue-i18n"
import ColorSwitch from "@/components/ColorSwitch.vue"
import Metrics from "@/services/metrics.ts"
import ImageEditor from "@/components/ImageEditor.vue"
import { ref } from "vue"

const { t } = useI18n()

const editor = ref<InstanceType<typeof ImageEditor>>()

function handleDownload() {
  Metrics.log(Metrics.ID.GENERATE_AVATAR)
  editor.value?.exportData()
}
</script>

<template>
  <section id="avatar-editor">
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
        <image-editor ref="editor" class="editor" />
        <p class="instructions">
          {{ t('instructions.1') }}
          <span style="color: var(--t2-green)">{{ t('instructions.2') }}</span>
        </p>
        <button class="t2 dark download" @click="handleDownload">{{ t('cta.download') }}</button>
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
  overflow: hidden;
  font-size: 10px;
  gap: 20px;

  @include large {
    font-size: 33px;
    gap: 15px;
  }

  table {
    border-spacing: 10px;
    border-collapse: separate;

    button {
      width: 100%;
      max-width: 130px;

      @include large {
        max-width: 400px;
      }
    }
  }
}

.download {
  margin: 20px auto 0 auto;

  @include large {
    margin-top: 55px;
  }
}

.instructions {
  text-align: center;

  margin-top: 20px;

  @include large {
    margin-top: 50px;
  }
}

.editor {
  align-self: center;
  margin-top: 30px;
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
  instructions.1: Вы можете менять расположение фото, поворачивать, увеличивать или уменьшать так,
  instructions.2: как вам нравится
  cta.photo: выбрать фото
  cta.download: мне нравится, скачать!
</i18n>
