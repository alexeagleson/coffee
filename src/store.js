import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const storeHelpers = {
  getVendorReviewsByID(state, vendorID) {
    return state.allReviews.find(reviewGroup => reviewGroup.vendorID === vendorID);
  },
  getAnswerByID(review, questionID) {
    return review.answers.find(answer => answer.questionID === questionID);
  },
  getReviewByPeriod(reviewGroup, reviewPeriod) {
    return reviewGroup.reviews.find(review => review.reviewPeriod === reviewPeriod);
  },
};

const newVendor = config => {
  return {
    vendorID: config.vendorID,
    reviews: [],
  };
};

const newReview = config => {
  return {
    reviewID: 999999,
    reviewPeriod: config.reviewPeriod,
    dateCreated: 'date',
    dateLastEdited: 'date',
    userLastEdited: 'username',
    answers: [],
  };
};

const newAnswer = config => {
  return {
    questionID: config.questionID,
    screenshots: config.screenshots,
    answer: config.answer,
    commentEnglish: config.commentEnglish,
    commentFrench: config.commentFrench,
  };
};

const store = new Vuex.Store({
  state: {
    allReviews: [],
    allVendors: [],
    reviewPeriods: [],
  },

  mutations: {
    UPDATE_ANSWER(state, payload) {
      let reviewGroup = storeHelpers.getVendorReviewsByID(state, payload.vendorID);

      if (!reviewGroup) {
        reviewGroup = newVendor({ vendorID: payload.vendorID });
        state.allReviews.push(reviewGroup);
      }

      let review = storeHelpers.getReviewByPeriod(reviewGroup, payload.reviewPeriod);
      if (!review) {
        review = newReview({ reviewPeriod: payload.reviewPeriod });
        reviewGroup.reviews.push(review);
      }

      const answer = storeHelpers.getAnswerByID(review, payload.completeAnswer.questionID);

      if (answer) {
        Object.assign(answer, payload.completeAnswer);
      } else {
        review.answers.push(newAnswer(payload.completeAnswer));
      }
    },
  },

  actions: {
    updateAnswer(context, payload) {
      context.commit('UPDATE_ANSWER', payload);
    },
    async saveToDatabase(context) {
      return axios
        .post('/submit-update', context.state)
        .then(response => {
          return response.data.message;
        })
        .catch(error => {
          return error;
        });
    },
    async populateAllVendors(context) {
      if (context.state.allVendors.length > 0) return;
      return axios
        .get('/vendor-list', {})
        .then(response => {
          context.state.allVendors = response.data.allVendors;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async populatereviewPeriods(context) {
      if (context.state.reviewPeriods.length > 0) return;
      return axios
        .get('/review-dates', {})
        .then(response => {
          context.state.reviewPeriods = response.data.reviewPeriods;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  getters: {
    getAllReviews(state) {
      return state.allReviews;
    },
    getAllVendors(state) {
      return state.allVendors;
    },
    getreviewPeriods(state) {
      return state.reviewPeriods;
    },
    getReviewByPeriod: state => IDs => {
      const reviewGroup = storeHelpers.getVendorReviewsByID(state, IDs.vendorID);
      if (!reviewGroup) return false;
      const review = storeHelpers.getReviewByPeriod(reviewGroup, IDs.reviewPeriod);
      if (!review) return false;
      return review;
    },
    getPreviousAnswer: state => IDs => {
      const reviewGroup = storeHelpers.getVendorReviewsByID(state, IDs.vendorID);
      if (!reviewGroup) return false;
      const review = storeHelpers.getReviewByPeriod(reviewGroup, IDs.reviewPeriod);
      if (!review) return false;
      const answer = storeHelpers.getAnswerByID(review, IDs.questionID);
      if (!answer) return false;
      return answer;
    },
  },
});

const testVendor = newVendor({ vendorID: 74004 });
const testReview = newReview({ reviewPeriod: 'November 2018' });
testVendor.reviews.push(testReview);
store.state.allReviews.push(testVendor);

export default store;
