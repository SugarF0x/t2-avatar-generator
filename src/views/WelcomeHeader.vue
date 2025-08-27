<script setup lang="ts">
import T2Logo from '@/assets/images/logo-black.svg'
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<template>
  <section id="header">
    <div class="container">
      <div class="toolbar">
        <img :src="T2Logo" alt="logo">
        <div class="bar" />
      </div>
      <div class="card">
        <div class="content">
          <h1>
            {{ t('title.1') }}
            <br>
            <span style="color: var(--t2-pink)">{{ t('title.2') }}</span>
          </h1>
          <p>{{ t('body.1') }}</p>
          <a href="#avatar-editor">
            <button class="t2 dark">{{ t('cta.ready') }}</button>
          </a>
        </div>
        <img src="@/assets/images/illustrations/header-profile.png" alt="profile" class="profile">
      </div>
      <img src="@/assets/images/illustrations/sim.png" alt="sim" class="sim">
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "sass:math";
@import '@/assets/styles/mixins';

#header {
  overflow: hidden;
}

.container {
  position: relative;

  gap: 5px;

  @include large {
    gap: 15px;
  }
}

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

.card {
  background-color: #EDEDEB;
  position: relative;
  overflow: hidden;

  border-radius: 15px;
  padding: 13px 13px 35vw 13px;

  @include large {
    border-radius: 30px;
    padding: 50px;
  }

  a {
    text-decoration: none;
    width: fit-content;
  }
}

.content {
  background-color: black;
  color: white;

  border-radius: 10px;
  padding: 10px;
  gap: 15px;
  font-size: 10px;

  @include large {
    font-size: 20px;
    max-width: 75%;
  }

  @include large {
    border-radius: 20px;
    padding: 30px 100px 50px 24px;
    gap: 30px;
  }

  p {
    font-family: "T2 Rooftop Regular", "Roboto Light", sans-serif;
  }

  h1 {
    font-family: "T2 Halvar Breit", sans-serif;

    font-size: 24px;

    @include large {
      font-size: 50px;
    }
  }

  button {
    margin-right: auto;
    padding-top: 43px;
    padding-bottom: 43px;

    margin-top: 10px;

    @include large {
      margin-top: 20px;
    }
  }
}

.profile {
  position: absolute;
  bottom: -10vw;
  right: -5vw;
  pointer-events: none;
  width: min(65vw, 50vh);

  @include large {
    transform: scale(1.25);
    width: unset;
    bottom: unset;
    height: 100%;

    $vw1: 650px;
    $vw2: 1240px;
    $ro1: -550px;
    $ro2: 0px;

    $m: math.div(($ro2 - $ro1), ($vw2 - $vw1));
    $c: $ro1 - $m * $vw1;

    right: calc(min(0px, max(-550px, calc($m * 100vw + $c))) - 160px);
  }
}

.sim {
  position: absolute;
  pointer-events: none;
  width: 50vw;
  left: 5vw;
  bottom: 0;
  transform: translate(-20%, 30%);

  @include large {
    width: 400px;
    left: calc(50% - min(0px, calc(100vw - 800px)));
    transform: translate(-50%, 30%);
  }
}
</style>

<i18n locale="ru">
title.1: ХОТИМ РАЗДЕЛИТЬ
title.2: С ВАМИ ВАЖНОЕ
body.1: Бренду T2 исполнился год! Помните, как прошлой осенью мы отмечали ребрендинг и ставили стилизованные аватарки в Telegram? Приглашаем вас снова окунуться в праздничную атмосферу вместе с нами.
cta.ready: Я С ВАМИ!
</i18n>

<i18n locale="en">
title.1: WE WANT TO SHARE
title.2: SOMETHING SPECIAL WITH YOU
body.1: The T2 brand has turned one year old! Do you remember how last autumn we celebrated the rebranding and set stylized avatars in Telegram? We invite you once again to immerse yourself in the festive atmosphere with us.
cta.ready: I'M IN!
</i18n>
