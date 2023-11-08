import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plguin/vuetify'
import { loadFonts } from './plguin/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
