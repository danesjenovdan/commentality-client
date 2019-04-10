<template>
  <div class="login">
    <div class="step-begin" v-if="authStep == 'begin'">
      <input type="text" name="phone" id="phone" placeholder="phone here" v-model="phone">
      <input type="submit" value="SEND ME TEH CODE" @click="getCode">
    </div>

    <div class="step-verify" v-if="authStep == 'verify'">
      <input type="text" name="code" id="code" placeholder="code here" v-model="code">
      <input type="submit" value="SUBMIT TEH CODE" @click="submitCode">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getCode, verifyCode, setJwtToken } from '../requests';

export default {
  name: 'Login',
  props: {
    authStep: {
      type: String,
      default: 'begin',
    },
  },
  data() {
    return {
      phone: '',
      code: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    getCode() {
      getCode(this.phone).then((data) => {
        alert(data.status);
        this.$emit('codeRequested');
      });
    },
    submitCode() {
      verifyCode(this.phone, this.code).then((data) => {
        console.log(data);
        this.$store.commit('SET_JWT', data.jwt_token);
        this.$store.commit('SET_USER_ID', data.uid);
        setJwtToken(data.jwt_token);
        this.$store.commit('SET_AUTHENTICATED', true);

        window.localStorage.setItem('commentalityUID', data.uid);
        window.localStorage.setItem('commentalityTOKEN', data.jwt_token);

        this.$emit('authenticated');
      });
    },
    isInt(s) {
      return parseInt(s, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
