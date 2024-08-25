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
    padding: 30px 80px 50px 24px;
    gap: 30px;
  }

  h1 {
    font-family: "T2 Halvar Breit", sans-serif;
    text-transform: uppercase;

    font-size: 24px;

    @include large {
      font-size: 50px;
    }
  }

  button {
    margin-right: auto;

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
    top: -20px;
    width: unset;
    height: calc(100% + 20px);
    right: min(calc(-600px + max(0px, calc(80vw - 600px))), -200px);
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

<i18n>
ru:
  title.1: хотим разделить
  title.2: с вами важное
  body.1: "t2 — новый уровень Tele2. Мы изменили визуальный стиль, и предлагаем поддержать наше обновлении: опубликовать сторис и поставить стилизованную аватарку на один день."
  cta.ready: я готов!
</i18n>
