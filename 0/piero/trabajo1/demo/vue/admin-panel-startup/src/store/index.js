import { createStore } from 'vuex';

export default createStore({
  state: {
    users: [],
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit('addUser', user);
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
});
