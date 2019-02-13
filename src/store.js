import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const storeHelpers = {
  getVendorByID(state, vendorID) {
    return state.vendors.find(vendor => vendor.vendorID === vendorID);
  },
  getReviewByID(vendor, reviewID) {
    return vendor.reviews.find(review => review.reviewID === reviewID);
  },
  getAnswerByID(review, questionID) {
    return review.reviewContents.answers.find(answer => answer.questionID === questionID);
  },
};

const store = new Vuex.Store({
  state: {
    vendors: [
      {
        vendorID: 123456,
        reviews: [
          {
            reviewID: 123456,
            reviewContents: {
              dateCreated: 'date',
              dateLastEdited: 'date',
              userLastEdited: 'username',
              answers: [
                // {
                //   questionID: 1,
                //   screenshots: [],
                //   answer: 'text',
                //   commentEnglish: 'text',
                //   commentFrench: 'text',
                // },
              ],
            },
          },
        ],
      },
    ],
  },

  mutations: {
    UPDATE_ANSWER(state, payload) {
      const vendor = storeHelpers.getVendorByID(state, payload.vendorID);

      if (vendor) {
        const review = storeHelpers.getReviewByID(vendor, payload.reviewID);

        if (review) {
          const answer = storeHelpers.getAnswerByID(review, payload.completeAnswer.questionID);

          if (answer) {
            Object.assign(answer, payload.completeAnswer);
          } else {
            review.reviewContents.answers.push(payload.completeAnswer);
          }
        } else {
          alert('debug need to add new review');
        }
      } else {
        alert('debug need to add new vendor');
      }
    },
  },

  actions: {
    updateAnswer(context, payload) {
      context.commit('UPDATE_ANSWER', payload);
    },
    saveToDatabase(context) {
      return axios
        .post('/submit-update', context.state)
        .then(response => {
          return response.data.message;
        })
        .catch(error => {
          return error;
        });
    },
  },

  getters: {
    getVendors(state) {
      return state.vendors;
    },
    getPreviousAnswer: state => IDs => {
      const vendor = storeHelpers.getVendorByID(state, IDs.vendorID);
      if (!vendor) return false;
      const review = storeHelpers.getReviewByID(vendor, IDs.reviewID);
      if (!review) return false;
      const answer = storeHelpers.getAnswerByID(review, IDs.questionID);
      if (!answer) return false;
      return answer;
    },
  },
});

export default store;
