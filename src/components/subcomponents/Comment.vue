<template>
  <div class="page-contents">
    <h1>Select feedback for answer: {{questionResponse}}</h1>
    <div
      v-for="(comment) in comments"
      v-bind:key="`${comment.english}`"
    >
      <label v-if="questionResponse === comment.forAnswer">
        <input
          type="radio"
          v-bind:value="comment.english"
          v-model="chosenAnswer"
        >
        <span>{{ comment.english}}</span>
      </label>
    </div>
    <button v-on:click="$emit('feedback-selected', verifyAnswer())">
      SUBMIT
    </button>
  </div>
</template>

<script>
export default {
  props: ['comments', 'questionResponse'],
  data() {
    return {
      chosenAnswer: '',
    };
  },
  methods: {
    verifyAnswer() {
      if (this.chosenAnswer) return this.chosenAnswer;
    },
  },
};
</script>

<style scoped>
</style>