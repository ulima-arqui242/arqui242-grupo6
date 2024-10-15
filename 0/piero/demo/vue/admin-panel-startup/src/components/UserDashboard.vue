<template>
  <div>
    <NavBar />
    <h2>Dashboard</h2>
    <p>Bienvenido al panel de administración</p>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  name: 'UserDashboard', // Renombrado de Dashboard a UserDashboard
  components: {
    NavBar,
  },
};
</script>
