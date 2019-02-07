<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    localStorage.removeItem('dealer20user');
    this.$router.push('/');
  }
};
</script>