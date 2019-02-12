<template>
  <div class="page-layout animated fadeIn">
    <div
      class="page-contents"
      v-if="reviewLoaded"
    >
      <div class="page-contents-row">
        <button
          v-bind:class="{ currentTab: question.questionID === currentQuestion }"
          v-on:click="changeQuestion(`${question.questionID}`)"
          v-for="(question) in review.questions"
          v-bind:key="`${question.questionID}`"
        >{{question.questionID}} </button>
      </div>
      <Question
        v-bind:question="getQuestion(currentQuestion)"
        v-on:question-complete="questionComplete($event)"
      />
    </div>
  </div>
</template>

<script>
import Question from './subcomponents/Question.vue';

export default {
  data() {
    return {
      review: {},
      reviewLoaded: false,
      currentQuestion: 1,
      vendorID: 123456,
      reviewID: 123456,
    };
  },
  methods: {
    changeQuestion(questionID) {
      this.currentQuestion = parseInt(questionID);
    },
    questionComplete(answerAndFeedback) {
      const completeAnswer = {
        questionID: this.currentQuestion,
        screenshots: [],
        answer: answerAndFeedback.answer,
        commentEnglish: answerAndFeedback.feedback,
        commentFrench: 'french not implemented yet',
      };

      this.$store.dispatch('updateAnswer', { vendorID: this.vendorID, reviewID: this.reviewID, completeAnswer: completeAnswer });
      this.currentQuestion += 1;
    },
    getQuestion(questionID) {
      return this.review.questions.find(question => question.questionID === questionID);
    },
  },
  mounted() {
    this.$axios
      .get('/review', {})
      .then(response => {
        this.review = response.data.review;
        this.reviewLoaded = true;
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    Question,
  },
};
</script>

<style scoped>
</style>