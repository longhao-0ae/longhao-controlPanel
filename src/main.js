import { createApp } from 'vue'
import App from './App.vue'
//import Vant from 'vant';
//import 'vant/lib/index.css';
import Equal from 'equal-vue';
import 'equal-vue/dist/style.css';
import VueSSE from 'vue-sse';

const app = createApp(App)
//app.use(Vant)
app.use(Equal)
app.use(VueSSE)
app.mount('#app')
