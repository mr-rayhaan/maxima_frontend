import { createApp } from 'vue' 
import 'the-new-css-reset/css/reset.css'

import App from '@/App.vue'
import router from '@/router/index'
import axios from "axios" 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Toast from "vue-toastification"; 
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(router)
app.use(Toast)
app.config.globalProperties.axios = axios

app.mount('#app')
