<template>
  <div class="login">
    <div
      v-if="authStep === 'begin'"
      class="step-begin"
    >
      Please enter your phone number to receive code.
      <input
        v-model="phoneNumber"
        type="tel"
        class="phone-number"
        placeholder="+386 41 123 456"
      >
      <button
        class="button"
        @click="getCode">
        Get the code
      </button>
    </div>
    <div
      v-else-if="authStep === 'verify'"
      class="step-verify"
    >
      Enter the code to see the results.
      <input
        v-model="code"
        type="number"
        name="code"
        placeholder="123456"
      >
      <button @click="submitCode">
        Enter
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getCode, verifyCode, setJwtToken } from '../requests';

export default {
  name: 'Login',
  components: {
  },
  props: {
    authStep: {
      type: String,
      default: 'begin',
    },
  },
  data() {
    return {
      phoneNumber: '',
      code: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    getCode() {
      getCode(this.phoneNumber).then((data) => {
        console.log(data.status);
        this.$emit('codeRequested');
      });
    },
    submitCode() {
      verifyCode(this.phoneNumber, this.code).then((data) => {
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
.login {
  font-size: 14px;

  .phone-number {
    width: 150px;
    margin: 1.75rem 1rem 0;
  }
}
</style>
