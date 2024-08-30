<script setup lang="ts">
import Video1 from "@/assets/videos/1.mp4"
import { useI18n } from "vue-i18n"
import { ref } from "vue"
import Metrics from "@/services/metrics.ts"

const { t } = useI18n()

const previews = [Video1,Video1,Video1,Video1]

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
        <button class="t2 dark" @click="handleDownload">{{ t('cta.download') }}</button>
        <small class="prompt">{{ t('cta.download.prompt') }}</small>
      </div>
      <div class="footer">
        <span>
          {{ t('footer.body.1') }}:
          <a :href="'mailto:' + t('footer.email')">{{ t('footer.email') }}</a>
          <br>
          {{ t('footer.body.2') }}
        </span>
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

.footer {
  font-size: .3em;

  text-align: center;
  opacity: .5;

  @include large {
    text-align: right;
    max-width: 40%;

    margin-left: auto;
  }

  a {
    color: var(--t2-cyan);
  }
}
</style>

<i18n>
ru:
  title.1: что еще
  title.2: интересного?
  body.1: Вы можете скачать CGI-ролик и опубликовать его в своих телеграм-сторис
  cta.download: скачать
  cta.download.prompt: Ищите видео в загрузках своего смартфона
  footer.body.1: По всем техническим вопросам обращайтесь на почту
  footer.body.2: Вам ответят в ближайшее время
  footer.email: t2avatar{'@'}affect.ru
</i18n>
