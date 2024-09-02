<script setup lang="ts">
import ColorSwitch from "@/components/ColorSwitch.vue"
import ImageCrop from "@/components/ImageCrop.vue"
import ImageEditor from "@/components/ImageEditor.vue"
import LineArrow from "@/components/LineArrow.vue"
import Device from "@/services/device.ts"
import Metrics from "@/services/metrics.ts"
import Upload from "@/services/upload.ts"
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const editor = ref<InstanceType<typeof ImageEditor>>()

function handleUpload() {
  Upload.data.value = null

  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'

  fileInput.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    if (!target) return

    const file = target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = e => {
      if (!e.target) return
      Upload.rawData.value = String(e.target.result)
    }

    reader.readAsDataURL(file)
  })

  fileInput.click()
}

function handleDownload() {
  Metrics.log(Metrics.ID.GENERATE_AVATAR)
  editor.value?.exportData()
}
</script>

<template>
  <section id="avatar-editor">
    <div class="container">
      <image-crop />
      <h2 class="title">{{ t('title') }}</h2>
      <div class="content">
        <small v-if="Device.isTelegram" class="prompt telegram-warning">{{ t('prompt.telegram') }}</small>
        <table>
          <tr>
            <td>
              <span class="step">{{ t('step.1.title') }}</span>
              {{ t('step.1.description') }}
            </td>
            <td><line-arrow /></td>
            <td>
              <button class="t2 dark" @click="handleUpload">{{ t('cta.photo') }}</button>
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
        <button class="t2 dark download" @click="handleDownload" :disabled="!Upload.data.value">{{ t('cta.download') }}</button>
        <small class="prompt">{{ t('cta.download.prompt') }}</small>
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
  background-color: var(--t2-grey);

  border-radius: 7px;
  padding: 10px;

  @include large {
    border-radius: 30px;
    padding: 75px 50px;
  }
}

.prompt {
  opacity: .5;
  text-align: center;

  @include large {
    font-size: .5em;
  }

  &:first-child { margin-bottom: 10px; }
  &:last-child { margin-top: 10px; }
}

.telegram-warning {
  color: var(--t2-pink);
  opacity: 1;
}
</style>

<i18n>
ru:
  title: воспользуйтесь конструктором
  step.1.title: 'Шаг 1:'
  step.1.description: выберите портретное фото из галереи
  step.2.title: 'Шаг 2:'
  step.2.description: выберите цвет фона, переключая кнопку
  instructions.1: Вы можете менять расположение фото, увеличивать или уменьшать так,
  instructions.2: как вам нравится
  cta.photo: выбрать фото
  cta.download: мне нравится, скачать!
  cta.download.prompt: Ищите фото в загрузках своего браузера
  prompt.telegram: "Кажется, вы открыли эту страницу через встроенный браузер Telegram. Чтобы воспользоваться конструктором, пожалуйста, откройте страницу в другом браузере: нажмите на кнопку меню в верхней части экрана"
en:
  title: use the editor
  step.1.title: 'Step 1:'
  step.1.description: select an image from your photo gallery
  step.2.title: 'Step 2:'
  step.2.description: select a color by toggling the switch
  instructions.1: You can adjust the position and scale of the image
  instructions.2: to your liking
  cta.photo: select image
  cta.download: I like it, download!
  cta.download.prompt: Find the photo in your browser downloads directory
  prompt.telegram: "It seems that you’ve opened this page through Telegram’s built-in browser. To use the editor, please open the page in another browser: tap the menu button at the top of the screen."
</i18n>
