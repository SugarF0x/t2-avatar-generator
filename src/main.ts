import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import './assets/styles/global.scss'
import { createI18n } from "vue-i18n"

const i18n = createI18n({
  locale: 'ru'
})

export const createApp = ViteSSG(App, ({ app }) => {
  app.use(i18n)
})
