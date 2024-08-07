import { computed, ref } from "vue"

export const colors = ['pink', 'green', 'cyan', 'blue']
export const colorIndex = ref(0)
export const selectedColor = computed(() => colors[colorIndex.value])
