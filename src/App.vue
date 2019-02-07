<template>
  <div id="app">
    <h3 style="text-align: center;" id="nav">
      <router-link v-bind:class="{ bold: routeName('dashboard') }" v-if="loggedIn()" to="/dashboard">Dashboard</router-link>
      <router-link v-bind:class="{ bold: routeName('review') }" v-if="loggedIn()" to="/review"> | Review</router-link>
      <router-link v-bind:class="{ bold: routeName('logout') }" v-if="loggedIn()" to="/logout"> | Logout</router-link>
    </h3>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    routeName(name) {
      return this.$route.name === name;
    },
    loggedIn() {
      return !!localStorage.getItem('dealer20user');
    },
  },
};
</script>

<style scoped>
#nav {
  padding-top: 50px;
}

.bold {
  font-size: 20px;
}
</style>