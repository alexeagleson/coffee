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
      <template v-for="(question) in review.questions">
        <Question
          v-show="question.questionID === currentQuestion"
          v-bind:key="question.questionID"
          v-bind:question="question"
          v-bind:currentQuestion="currentQuestion"
          v-bind:vendorID="vendorID"
          v-bind:reviewID="reviewID"
          v-on:save-question="saveQuestion($event)"
        />
      </template>
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
    saveQuestion(emittedResponse) {
      const completeAnswer = {
        questionID: emittedResponse.questionID,
        screenshots: [],
        answer: emittedResponse.answer,
        commentEnglish: emittedResponse.feedback,
        commentFrench: 'french not implemented yet',
      };

      this.$store.dispatch('updateAnswer', {
        vendorID: this.vendorID,
        reviewID: this.reviewID,
        completeAnswer: completeAnswer,
      });
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