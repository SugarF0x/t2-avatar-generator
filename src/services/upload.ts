import { ref } from "vue"

const rawData = ref<null | string>(null)
const data = ref<null | string>(null)

export default {
  rawData,
  data
}
