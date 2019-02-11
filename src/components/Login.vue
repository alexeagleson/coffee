<template>
  <div class="page-layout">
    <form class="page-contents">
      <div>
        <label for="login-username">Username </label>
        <input
          type="text"
          id="login-username"
          placeholder="username"
          v-model="username"
          required
          autofocus
        >
      </div>
      <div>
        <label for="login-password">Password </label>
        <input
          type="password"
          id="login-password"
          placeholder="password"
          v-model="password"
          required
        >
      </div>
      <div>
        <small v-if="error">{{error}}</small>
      </div>
      <div>
        <button
          type="submit"
          v-on:click="handleSubmit"
        >Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  mounted() {
    if(localStorage.getItem('dealer20user')) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.username.length > 0 && this.password.length > 0) {
        localStorage.setItem('dealer20user', this.username);
        if (this.$route.params.nextUrl) {
          this.$router.push(this.$route.params.nextUrl);
        } else {
          this.$router.push('/dashboard');
        }
      } else {
        this.error = 'Field cannot be empty';
      }
    },
  },
};
</script>

<style scoped>
</style>