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
                @click="colorIndex = index"
              >
                <span v-if="colorIndex === index" class="selection-circle" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
#color-picker {
  gap: calc(100vw / 12.8);

  table {
    border-collapse: separate;
    border-spacing: calc(100vw / 30) calc(100vw / 14.7);
  }
}

.highlighted {
  color: var(--t2-green);
}

.actions {
  flex-direction: row;
  gap: calc(100vw / 192);
}

.circle {
  all: unset;
  width: calc(100vw / 13.7);
  height: calc(100vw / 13.7);
  border-radius: 50%;
  aspect-ratio: 1;
  cursor: pointer;
  transition: .01s ease-in-out;
  position: relative;

  &:hover, &:focus-visible {
    filter: contrast(.9);
  }

  &:focus-visible {
    outline: 4px solid cyan;
  }

  &:active {
    filter: contrast(.8);
  }

  .selection-circle {
    box-sizing: border-box;
    border: 5px solid white;
    border-radius: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(-50%) scale(.9);
  }
}
</style>
