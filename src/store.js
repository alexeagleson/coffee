import Vue from 'vue';
import Vuex from 'vuex';

const state = {
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
};

const mutations = {
  UPDATE_ANSWER(state, payload) {
    const vendorMatch = state.vendors.find(vendor => vendor.vendorID === payload.vendorID);

    if (vendorMatch) {
      const reviewMatch = vendorMatch.reviews.find(review => review.reviewID === payload.reviewID);

      if (reviewMatch) {
        const answerMatch = reviewMatch.reviewContents.answers.find(answer => answer.questionID === payload.completeAnswer.questionID);

        if (answerMatch) {
          Object.assign(answerMatch, payload.completeAnswer);
        } else {
          reviewMatch.reviewContents.answers.push(payload.completeAnswer);
        }
      } else {
        alert('debug need to add new review');
      }
    } else {
      alert('debug need to add new vendor');
    }

    console.log(state.vendors);

    // state.responses.forEach((response, index) => {
    //   if (response.option === payload) {
    //     const updatedResponse = { option: payload, numResponses: response.numResponses + 1 };
    //     Vue.set(state.responses, index, updatedResponse);
    //   }
    // });
  },
};

const actions = {
  updateAnswer(context, payload) {
    context.commit('UPDATE_ANSWER', payload);
  },
};

const getters = {
  getVendors(state) {
    return state.vendors;
  },
};

Vue.use(Vuex);

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
});

export default store;
