import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@/assets/js/jquery.min.js';
import '@/assets/js/bootstrap.bundle.min.js';
import '@/assets/js/metisMenu.min.js';
import '@/assets/js/simplebar.min.js';
// import '@/assets/js/waves.min.js';
import '@/assets/js/jquery.waypoints.min.js';
import '@/assets/js/jquery.counterup.min.js';
import '@/assets/js/app.js';

// router
import router from "@/router/index.js";

const app = createApp(App);

app.use(router);

app.mount('#app');


