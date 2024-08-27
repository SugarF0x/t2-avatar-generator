<script setup lang="ts">
import Preview1 from "@/assets/images/video-previews/1.png"
import Preview2 from "@/assets/images/video-previews/2.png"
import Preview3 from "@/assets/images/video-previews/3.png"
import Preview4 from "@/assets/images/video-previews/4.png"
import { useI18n } from "vue-i18n"
import { ref } from "vue"

const { t } = useI18n()

const previews = [Preview1, Preview2, Preview3, Preview4]

const selectedIndex = ref<null | number>(null)
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
        <div v-for="(preview, i) in previews"  :key="preview" :class="{ selected: selectedIndex === i}" class="img-wrapper">
          <img :src="preview" alt="preview" @click="selectedIndex = i">
        </div>
      </div>
      <button class="t2 dark">{{ t('cta.download') }}</button>
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
  width: 40%;

  @include large {
    width: 20%;
  }

  img {
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
</style>

<i18n>
ru:
  title.1: что еще
  title.2: интересного?
  body.1: В поддержку ребрендинга вы можете скачать ролик  и опубликовать его в сторис
  cta.download: скачать
</i18n>
