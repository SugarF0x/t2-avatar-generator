<script setup lang="ts">
import T2Logo from '@/assets/t2-logo.svg'
</script>

<template>
  <div class="header">
    <div class="title">
      <div>хотим разделить</div>
      <div class="highlighted">с вами важное</div>
    </div>
    <div>
      Сегодня произошло крупное обновление: бренд Tele2 стал t2!
      <br>
      Качество связи осталось, изменился только визуальный стиль
    </div>
    <div class="highlighted">
      Предлагаем сменить аватарку в телеграм на 1 день
    </div>
    <div class="actions">
      <button>
        я готов!
      </button>

      <img :src="T2Logo" alt="t2-logo">
    </div>
  </div>
</template>

<style scoped lang="scss">
$pink: #FE3496;

.header {
  padding: 8% 10%;
  gap: 50px;
  font-size: 40px;
}

.highlighted {
  color: $pink;
}

.title {
  text-transform: uppercase;
  font-size: 130px;
}

.actions {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  button {
    all: unset;
    background-color: $pink;
    color: white;
    padding: 40px;
    font-size: 70px;
    text-transform: uppercase;
    border-radius: 13px;
    cursor: pointer;

    &:hover, &:focus-visible {
      filter: contrast(.9);
    }

    &:focus-visible {
      outline: 4px solid black;
    }

    &:active {
      filter: contrast(.8);
    }
  }
}
</style>
