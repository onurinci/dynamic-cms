import {createApp, defineAsyncComponent} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import { vfmPlugin } from 'vue-final-modal';
import { createPinia } from "pinia";

const app = createApp(App);

app.component('InputText', defineAsyncComponent({
    loader: () => import('./components/ContentBuilder/InputText.vue')
}));

app.component('InputSelect', defineAsyncComponent({
    loader: () => import('./components/ContentBuilder/InputSelect.vue')
}));

app.component('InputImage', defineAsyncComponent({
    loader: () => import('./components/ContentBuilder/InputImage.vue')
}));

app.component('InputVideo', defineAsyncComponent({
    loader: () => import('./components/ContentBuilder/InputVideo.vue')
}));

app.component('InputCollection', defineAsyncComponent({
    loader: () => import('./components/ContentBuilder/InputCollection.vue')
}));

app.component('InputTextarea',defineAsyncComponent({
    loader: () => import('./components/ContentBuilder/InputTextarea.vue')
}));

app.use(router);
app.use(vfmPlugin);
app.use(createPinia());

app.mount('#app');
