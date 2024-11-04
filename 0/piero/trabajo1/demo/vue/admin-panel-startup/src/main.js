import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Si usas Vuex

const app = createApp(App);

// Usamos el router en la instancia de la aplicación
app.use(router);
app.use(store); // Solo si usas Vuex
app.mount('#app');
