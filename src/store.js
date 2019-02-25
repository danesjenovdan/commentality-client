import Vue from 'vue';
import Vuex from 'vuex';
import { refreshToken, setJwtToken } from './requests';

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
  actions: {
    async refreshOrComplain({ commit }) {
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
          commit('SET_JWT', data.jwt_token);
          commit('SET_USER_ID', data.uid);
          setJwtToken(data.jwt_token);
          commit('SET_AUTHENTICATED', true);

          window.localStorage.setItem('commentalityUID', data.uid);
          window.localStorage.setItem('commentalityTOKEN', data.jwt_token);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});
