import { createApp } from 'vue'

import 'the-new-css-reset/css/reset.css'

import App from '@/App.vue'
import router from '@/router/index'
import axios from "axios"

const app = createApp(App)

app.use(router)

app.config.globalProperties.axios = axios; 

app.mount('#app')
