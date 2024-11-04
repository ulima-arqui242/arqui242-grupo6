<template>
  <div>
    <NavBar />
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
    <button @click="addUser">Add User</button>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  name: 'ManageUsers', // Renombrado de Users a ManageUsers
  components: {
    NavBar,
  },
  data() {
    return {
      users: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ],
    };
  },
  methods: {
    addUser() {
      const newUser = { id: this.users.length + 1, name: `User ${this.users.length + 1}` };
      this.users.push(newUser);
    },
  },
};
</script>
