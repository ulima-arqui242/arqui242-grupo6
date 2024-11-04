<template>
  <nav class="navbar">
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/users">Users</router-link>
    <router-link to="/Products">Products</router-link>
    <router-link to="/settings">Settings</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  background-color: #333;
  padding: 10px;
}
.navbar a {
  color: white;
  text-decoration: none;
}
</style>
