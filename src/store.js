import Vue from 'vue';
import Vuex from 'vuex';

const state = {
  responses: [
    {
      option: 'yes',
      numResponses: 0,
    },
    {
      option: 'somewhat',
      numResponses: 0,
    },
    {
      option: 'no',
      numResponses: 0,
    },
  ],
};

const mutations = {
  ADD_RESPONSE(state, payload) {
    state.responses.forEach((response, index) => {
      if (response.option === payload) {
        const updatedResponse = { option: payload, numResponses: response.numResponses + 1 };
        Vue.set(state.responses, index, updatedResponse);
      }
    });
  },
};

const actions = {
  addResponse(context, payload) {
    context.commit('ADD_RESPONSE', payload);
  },
};

const getters = {
  getResponses(state) {
    return state.responses;
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
