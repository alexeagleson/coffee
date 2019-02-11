<template>
  <div class="page-contents">
    <h2>{{questionText}}</h2>
    <div class="radio-button-form">
      <div
        v-for="(answer) in answers"
        v-bind:key="`${answer}`"
      >
        <label>
          <input
            type="radio"
            v-bind:value="answer"
            v-model="chosenAnswer"
          >
          <span>{{ caps(answer)}}</span>
        </label>
      </div>
    </div>
    <button
      v-if="chosenAnswer"
      v-on:click="$emit('answer-selected', verifyAnswer())"
    >
      SUBMIT
    </button>
  </div>
</template>

<script>
export default {
  props: ['questionText', 'answers'],
  name: 'Question',
  data() {
    return {
      chosenAnswer: '',
    };
  },
  methods: {
    caps(anyText) {
      return anyText.charAt(0).toUpperCase() + anyText.slice(1);
    },
    verifyAnswer() {
      if (this.chosenAnswer) return this.chosenAnswer;
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>