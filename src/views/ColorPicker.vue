<script setup lang="ts">
import LineArrow from "@/components/LineArrow.vue"
import { colors, colorIndex } from "@/store.ts"
</script>

<template>
  <section id="color-picker">
    <div class="title">
      <div>Воспользуйтесь</div>
      <div class="highlighted">конструктором</div>
    </div>

    <table>
      <tbody>
        <tr>
          <td>
            <span>
              <span style="color: var(--t2-green)">Шаг 1:</span>
              выберите фото
            </span>
          </td>
          <td><line-arrow /></td>
          <td><button class="t2 secondary" style="flex: 0;">Выбрать фото</button></td>
        </tr>
        <tr>
          <td>
            <span>
              <span style="color: var(--t2-green)">Шаг 2:</span>
              выберите цвет
            </span>
          </td>
          <td><line-arrow /></td>
          <td>
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
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
#color-picker {
  gap: 150px;

  table {
    border-collapse: separate;
    border-spacing: calc(1920px / 30) calc(1920px / 14.7);
  }
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
  transition: .01s ease-in-out;

  &:hover, &:focus-visible {
    filter: contrast(.9);
  }

  &:focus-visible {
    outline: 4px solid cyan;
  }

  &:active {
    filter: contrast(.8);
  }

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
