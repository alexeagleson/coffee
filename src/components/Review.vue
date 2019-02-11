<template>
  <div class="page-layout animated fadeIn">
    <div
      class="page-contents"
      v-if="courseLoaded"
    >
      <div class="page-contents-row">
        <button
          v-bind:class="{ currentTab: question.number === currentQuestion }"
          v-on:click="changeQuestion(`${question.number}`)"
          v-for="(question) in course.questions"
          v-bind:key="`${question.number}`"
        >{{question.number}} </button>
      </div>
      <Question
        v-if="questionMode"
        v-bind:questionText="getQuestion(currentQuestion).questionText"
        v-bind:answers="getQuestion(currentQuestion).answers"
        v-on:answer-selected="toggleQuestionComment($event)"
      />
      <Comment
        v-if="!questionMode"
        v-bind:comments="getQuestion(currentQuestion).comments"
        v-bind:questionResponse="questionResponse"
        v-on:feedback-selected="nextQuestion()"
      />
    </div>
  </div>
</template>

<script>
import Comment from './subcomponents/Comment.vue';
import Question from './subcomponents/Question.vue';

export default {
  data() {
    return {
      course: {},
      courseLoaded: false,
      questionMode: true,
      questionResponse: null,
      currentQuestion: 1,
    };
  },
  methods: {
    toggleQuestionComment(questionResponse) {
      this.questionMode = !this.questionMode;
      this.questionResponse = questionResponse;
      this.$store.dispatch('addResponse', questionResponse);
    },
    changeQuestion(questionNumber) {
      this.questionMode = true;
      this.currentQuestion = parseInt(questionNumber);
    },
    nextQuestion(questionResponse) {
      this.questionMode = true;
      this.currentQuestion += 1;
    },
    getQuestion(questionNumber) {
      return this.course.questions.find(question => question.number === questionNumber);
    }
  },
  mounted() {
    this.$axios
      .get('/course', {})
      .then(response => {
        this.course = response.data.course;
        console.log(this.course)
        this.courseLoaded = true;
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    Comment,
    Question,
  },
};
</script>

<style scoped>
</style>