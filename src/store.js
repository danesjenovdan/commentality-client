import Vue from 'vue';
import Vuex from 'vuex';
import { getCode, refreshToken, setJwtToken, verifyCode } from './requests';

Vue.use(Vuex);

export const AuthStep = Object.freeze({
  Unauthenticated: 1,
  StartedVerification: 2,
  RequestedCode: 3,
  Authenticated: 4,
});

export default new Vuex.Store({
  state: {
    authStep: AuthStep.Unauthenticated,
    jwt: null,
    userId: null,
  },
  mutations: {
    SET_AUTH_STEP(state, newState) {
      state.authStep = newState;
    },
    SET_JWT(state, newJwt) {
      state.jwt = newJwt;
    },
    SET_USER_ID(state, newUserId) {
      state.userId = newUserId;
    },
  },
  getters: {
    authStep: state => state.authStep,
    authenticated: state => state.authStep === AuthStep.Authenticated,
    jwt: state => state.jwt,
    userId: state => state.userId,
  },
  actions: {
    async refreshJwtToken({ dispatch }) {
      // check if logged in
      const uid = window.localStorage.getItem('commentalityUID');
      const token = window.localStorage.getItem('commentalityTOKEN');

      console.log(uid, token);

      if (uid && token) {
        setJwtToken(token);
        try {
          const data = await refreshToken();
          console.log('refreshed token');
          console.log(data);
          dispatch('storeAuthData', {
            jwtToken: data.jwt_token,
            userId: data.uid,
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    async submitCode({ dispatch }, { phoneNumber, code }) {
      const data = await verifyCode(phoneNumber, code);

      dispatch('storeAuthData', {
        jwtToken: data.jwt_token,
        userId: data.uid,
      });
    },
    startVerification({ commit }) {
      commit('SET_AUTH_STEP', AuthStep.StartedVerification);
    },
    getCode({ commit }, phoneNumber) {
      commit('SET_AUTH_STEP', AuthStep.RequestedCode);
      return getCode(phoneNumber);
    },
    storeAuthData({ commit }, { jwtToken, userId }) {
      commit('SET_JWT', jwtToken);
      commit('SET_USER_ID', userId);
      setJwtToken(jwtToken);
      commit('SET_AUTH_STEP', AuthStep.Authenticated);

      window.localStorage.setItem('commentalityUID', userId);
      window.localStorage.setItem('commentalityTOKEN', jwtToken);
    },
  },
});
