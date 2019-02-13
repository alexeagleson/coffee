<template>
  <div class="page-layout animated fadeIn">
    <div
      class="page-contents"
      v-if="reviewLoaded"
    >
      <select v-model="selectedVendorID">
        <option
          v-for="(vendor) in allVendors"
          v-bind:key="vendor.vendorID"
          v-bind:value="vendor.vendorID"
        >
          {{`${vendor.vendorName} (${vendor.vendorID})`}}
        </option>
      </select>
      <select v-model="selectedReviewPeriod">
        <option
          v-for="(reviewPeriod) in reviewPeriods"
          v-bind:key="reviewPeriod"
          v-bind:value="reviewPeriod"
        >
          {{reviewPeriod}}
        </option>
      </select>

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
          v-bind:vendorID="selectedVendorID"
          v-bind:reviewPeriod="selectedReviewPeriod"
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
      allVendors: [],
      reviewPeriods: [],
      selectedVendorID: 0,
      selectedReviewPeriod: '',
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
        vendorID: this.selectedVendorID,
        reviewPeriod: this.selectedReviewPeriod,
        completeAnswer: completeAnswer,
      });
    },
    getQuestion(questionID) {
      return this.review.questions.find(question => question.questionID === questionID);
    },
  },
  async mounted() {
    await this.$store.dispatch('populateAllVendors');
    this.allVendors = this.$store.getters.getAllVendors;

    await this.$store.dispatch('populatereviewPeriods');
    this.reviewPeriods = this.$store.getters.getreviewPeriods;

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
  watch: {
    selectedReviewPeriod() {
      const previousReview = this.$store.getters.getReviewByPeriod({
        vendorID: this.selectedVendorID,
        reviewPeriod: this.selectedReviewPeriod,
      });
    },
  },
  components: {
    Question,
  },
};
</script>

<style scoped>
</style>