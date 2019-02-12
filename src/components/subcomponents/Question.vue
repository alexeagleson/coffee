<template>
  <div class="page-contents">
    <h2>{{question.questionText}}</h2>
    <div class="radio-button-form">
      <div
        v-for="(answerOption) in question.answerOptions"
        v-bind:key="`${answerOption}`"
      >
        <label>
          <input
            type="radio"
            v-bind:value="answerOption"
            v-model="chosenAnswer"
          >
          <span>{{ caps(answerOption)}}</span>
        </label>
      </div>
    </div>

    <template v-if="chosenAnswer">
      <h2>Feedback:</h2>
      <div
        v-for="(comment) in question.comments"
        v-bind:key="`${comment.english}`"
      >
        <label v-if="chosenAnswer === comment.forAnswer">
          <input
            type="radio"
            v-bind:value="comment.english"
            v-model="chosenFeedback"
          >
          <span>{{ comment.english}}</span>
        </label>
      </div>
      <div>
        <textarea
          rows=10
          cols=100
          v-model="editedFeedback"
        ></textarea>
      </div>
      <button v-on:click="$emit('question-complete', submitAnswer())">
        SUBMIT
      </button>
    </template>

  </div>
</template>

<script>
export default {
  props: ['question'],
  name: 'Question',
  data() {
    return {
      chosenAnswer: '',
      chosenFeedback: '',
      editedFeedback: '',
    };
  },
  methods: {
    caps(anyText) {
      return anyText.charAt(0).toUpperCase() + anyText.slice(1);
    },
    submitAnswer() {
      const answer = this.chosenAnswer;
      const feedback = this.editedFeedback;
      this.chosenAnswer = '';
      this.chosenFeedback = '';
      this.editedFeedback = '';
      return { answer, feedback };
    },
  },
  watch: {
    chosenAnswer: function() {
      this.chosenFeedback = '';
    },
    chosenFeedback: function() {
      this.editedFeedback = this.chosenFeedback;
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>