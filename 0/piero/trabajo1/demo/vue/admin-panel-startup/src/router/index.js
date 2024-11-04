import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '../components/AdminLogin.vue';
import UserDashboard from '../components/UserDashboard.vue';
import ManageUsers from '../components/ManageUsers.vue';
import UserProducts from '../components/UserProducts.vue';
import Settings from '../components/Settings.vue';

// Definimos las rutas
const routes = [
  { path: '/', name: 'AdminLogin', component: AdminLogin },
  { path: '/dashboard', name: 'UserDashboard', component: UserDashboard },
  { path: '/users', name: 'ManageUsers', component: ManageUsers },
  { path: '/Products', name: 'UserProducts', component: UserProducts },
  { path: '/settings', name: 'AppSettings', component: Settings },
];

// Creamos el router usando createRouter y createWebHistory (correcto para Vue 3)
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
