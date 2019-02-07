<template>
  <div class="page-layout animated fadeIn">
    <div class="page-contents">
      <h2>Do you think this is a good website?</h2>
      <div class="radio-button-form">
        <div
          v-for="(response) in responses"
          v-bind:key="`${response.option}`"
        >
          <label>
            <input
              v-bind:type="buttonType"
              v-model="chosenAnswer"
              v-bind:value="response.option"
            >
            <span>{{ response.option }}</span>
          </label>
        </div>
      </div>
      <button v-on:click="verifyAnswer()">SUBMIT</button>
      <small
        class="animated fadeIn"
        v-if="answerSubmitted"
      >Thank you for your opinion</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonType: 'radio',
      responses: this.$store.getters.getResponses,
      chosenAnswer: '',
      answerSubmitted: false,
    };
  },
  methods: {
    verifyAnswer() {
      if (this.chosenAnswer) {
        this.answerSubmitted = false;
        setTimeout(() => (this.answerSubmitted = true), 0);
        this.$store.dispatch('addResponse', this.chosenAnswer);
      }
      return true;
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>