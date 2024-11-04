<template>
  <div>
    <NavBar />
    <h2>Settings</h2>
    <p>Aquí puedes configurar la aplicación.</p>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  name: 'AppSettings', // Renombrado a nombre multi-palabra
  components: {
    NavBar,
  },
};
</script>
