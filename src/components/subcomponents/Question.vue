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
    </template>

  </div>
</template>

<script>
export default {
  props: ['question', 'currentQuestion', 'vendorID', 'reviewPeriod'],
  name: 'Question',
  data() {
    return {
      chosenAnswer: '',
      chosenFeedback: '',
      editedFeedback: '',
      answerUpdated: false,
    };
  },
  methods: {
    caps(anyText) {
      return anyText.charAt(0).toUpperCase() + anyText.slice(1);
    },
    saveToStore() {
      this.$emit('save-question', {
        questionID: this.question.questionID,
        answer: this.chosenAnswer,
        feedback: this.editedFeedback,
      });
    },
    updatePreviousQuestion() {
      const previousAnswer = this.$store.getters.getPreviousAnswer({
        vendorID: this.vendorID,
        reviewPeriod: this.reviewPeriod,
        questionID: this.question.questionID,
      });

      if (previousAnswer) {
        this.chosenAnswer = previousAnswer.answer;
        this.editedFeedback = previousAnswer.commentEnglish;
      } else {
        this.chosenAnswer = '';
        this.editedFeedback = '';
      }
    },
  },
  watch: {
    chosenAnswer: function() {
      this.chosenFeedback = '';
      this.answerUpdated = true;
    },
    chosenFeedback: function() {
      this.editedFeedback = this.chosenFeedback;
      this.answerUpdated = true;
    },
    editedFeedback: function() {
      this.answerUpdated = true;
    },
    currentQuestion: function() {
      if (this.answerUpdated) {
        this.saveToStore();
        this.answerUpdated = false;
      }
    },
    vendorID: function() {
      this.updatePreviousQuestion();
    },
    reviewPeriod: function() {
      this.updatePreviousQuestion();
    },
  },
  mounted() {
    this.updatePreviousQuestion();
  },
  beforeDestroy() {
    if (this.answerUpdated) this.saveToStore();
  },
};
</script>

<style scoped>
</style>