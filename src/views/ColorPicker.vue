<script setup lang="ts">
import LineArrow from "@/components/LineArrow.vue"
import { ref } from "vue"

const colors = ['pink', 'green', 'cyan', 'blue']
const colorIndex = ref(0)
</script>

<template>
  <section id="color-picker">
    <div class="title">
      <div>Воспользуйтесь</div>
      <div class="highlighted">конструктором</div>
    </div>
    <div class="steps-container">
      <!-- TODO: table?? -->
      <div class="step">
        <span>
          <span style="color: var(--t2-green)">Шаг 1:</span>
          выберите фото
        </span>
        <line-arrow />
        <button class="t2 secondary" style="flex: 0;">Выбрать фото</button>
      </div>
      <div class="step">
        <span>
          <span style="color: var(--t2-green)">Шаг 2:</span>
          выберите цвет
        </span>
        <line-arrow />
        <div class="actions">
          <button
            v-for="(color, index) of colors"
            :key="color"
            :style="{ backgroundColor: `var(--t2-${color})` }"
            class="circle"
            :class="{ selected:  colorIndex === index }"
            @click="colorIndex = index"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#color-picker {
  gap: 150px;
}

.steps-container {
  gap: 130px;
}

.step {
  flex-direction: row;
  gap: calc(1920px / 30);
  align-items: center;
}

.highlighted {
  color: var(--t2-green);
}

.actions {
  flex-direction: row;
  gap: 10px;
}

.circle {
  all: unset;
  width: calc(1920px / 13.7);
  height: calc(1920px / 13.7);
  border-radius: 50%;
  aspect-ratio: 1;
  cursor: pointer;

  &.selected::after {
    content: '';
    border: 5px solid white;
    border-radius: 50%;
    position: absolute;
    width: calc(1920px / 13.7) - 24;
    height: calc(1920px / 13.7) - 24;
    transform: translateY(-50%) translateX(6px);
  }
}
</style>
