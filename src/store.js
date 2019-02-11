import Vue from 'vue';
import Vuex from 'vuex';
import { random } from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    jwt: null,
    userId: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, newState) {
      state.authenticated = newState;
    },
    SET_JWT(state, newJwt) {
      state.jwt = newJwt;
    },
    SET_USER_ID(state, newUserId) {
      state.userId = newUserId;
    },
  },
  getters: {
    authenticated: state => state.authenticated,
    jwt: state => state.jwt,
    userId: state => state.userId,
  },
});
