import {createApp, defineAsyncComponent} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import { vfmPlugin } from 'vue-final-modal'
// import InputText from '@/components/ContentBuilder/InputText.vue';

const app = createApp(App);

app.component('InputText', defineAsyncComponent({
    loader: () => import('./components/ContentBuilder/InputText.vue')
}));
app.use(router);
app.use(vfmPlugin);

app.mount('#app');
