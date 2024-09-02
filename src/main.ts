import App from './App.vue'
import './assets/styles/global.scss'
import { createI18n } from "vue-i18n"
import { createApp } from "vue"

const app = createApp(App)

enum Locale {
  RU = 'ru',
  EN = 'en',
}

const DEFAULT_LOCALE = Locale.RU
const supportedLocales = new Set(Object.values(Locale))

const userLocale = (navigator.language?.split('-')[0]) as Locale
const locale = supportedLocales.has(userLocale) ? userLocale : DEFAULT_LOCALE

app.use(createI18n({ locale }))

app.mount('#app')
