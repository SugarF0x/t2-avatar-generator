<script setup lang="ts">
import Doma from "@/assets/videos/doma.mp4"
import Vid_3 from '@/assets/videos/Vid_3.mp4'
import Vid_10 from '@/assets/videos/Vid_10.mp4'
import Vid_12 from '@/assets/videos/Vid_12.mp4'
import Vid_14 from '@/assets/videos/Vid_14.mp4'
import Svyaz from "@/assets/videos/svyaz.mp4"
import Vertolet from "@/assets/videos/vertolet.mp4"
import Water from "@/assets/videos/water.mp4"
import Metrics from "@/services/metrics.ts"
import { useI18n } from "vue-i18n"
import { ref } from "vue"

const { t } = useI18n()

const previews = [
  Doma,
  Vid_3,
  Vid_10,
  Vid_12,
  Vid_14,
  Svyaz,
  Vertolet,
  Water,
]

const selectedIndex = ref<null | number>(null)
let resetLastVideo: null | (() => void) = null

function handleVideoPress(e: MouseEvent, i: number) {
  const target = e.target as HTMLVideoElement
  if (!target) return

  resetLastVideo?.()
  selectedIndex.value = i
  target.play()
  resetLastVideo = () => {
    target.pause()
    target.currentTime = 0
  }
}

function handleDownload() {
  if (selectedIndex.value === null) return

  Metrics.log(Metrics.ID.DOWNLOAD_VIDEO)
  const link = document.createElement("a")
  link.download = `t2-${selectedIndex.value + 1}.mp4`
  link.href = previews[selectedIndex.value]
  link.click()
}
</script>

<template>
  <section id="what-else">
    <div class="container">
      <div class="text">
        <h2 class="title">
          {{ t('title.1') }}
          <span>{{ t('title.2') }}</span>
        </h2>
        <p>{{ t('body.1') }}</p>
      </div>
      <div class="items">
        <div v-for="(preview, i) in previews" :key="preview" :class="{ selected: selectedIndex === i}" class="img-wrapper">
          <video @click="e => handleVideoPress(e, i)" muted>
            <source :src="`${preview}#t=0.1`" type="video/mp4" />
          </video>
        </div>
      </div>
      <div class="button-container">
        <button class="t2 dark" @click="handleDownload" :disabled="selectedIndex === null">{{ t('cta.download') }}</button>
        <small class="prompt">{{ t('cta.download.prompt') }}</small>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/styles/mixins";

#what-else {
  button {
    margin: 0 auto;
  }
}

.text {
  gap: 10px;

  @include large {
    gap: 30px;
  }

  p {
    font-size: 10px;
    text-align: center;

    @include large {
      font-size: 40px;
    }
  }
}

.items {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  gap: 20px;

  @include large {
    gap: 32px;
  }
}

.img-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 16px;

  width: 40%;

  @include large {
    width: 20%;
  }

  img, video {
    cursor: pointer;
  }

  &.selected:after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;

    margin: 8px;
    border: 4px solid var(--t2-green);

    @include large {
      margin: 16px;
      border: 7px solid var(--t2-green);
    }
  }
}

.container {
  gap: 20px;

  @include large {
    gap: 70px;
  }
}

.title {
  font-family: "T2 Halvar Breit", sans-serif;
  text-align: center;
  text-transform: uppercase;

  font-size: 24px;

  @include large {
    font-size: 50px;
  }

  span {
    color: var(--t2-green);
  }
}

.prompt {
  opacity: .5;
  text-align: center;
  margin-top: 10px;
  font-size: .5em;
}
</style>

<i18n locale="ru">
title.1: И ЭТО ЕЩЕ
title.2: НЕ ВСЕ
body.1: Продлим ощущение праздника? Вы можете скачать один из наших роликов и опубликовать его в своих Telegram-сторис
cta.download: скачать
cta.download.prompt: Ищите видео в загрузках своего браузера
</i18n>

<i18n locale="en">
title.1: AND THAT’S
title.2: NOT ALL
body.1: Shall we keep the party going?
cta.download: download
cta.download.prompt: Find your video in your browser’s downloads folder
</i18n>
