import App from './App.vue'
import './assets/styles/global.scss'
import { createI18n } from "vue-i18n"
import { createApp } from "vue"

const app = createApp(App)

app.use(
  createI18n({
    locale: 'ru'
  })
)

app.mount('#app')
