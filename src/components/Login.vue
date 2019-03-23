<template>
  <div class="login">
    <div
      v-if="step === 'number'"
      class="step-begin"
    >
      {{ $t('enter-phone-for-code') }}
      <input
        v-model="phoneNumber"
        type="tel"
        class="number"
        :placeholder="$t('phone-number-placeholder')"
      >
      <button
        class="button confirm"
        @click="getCode(phoneNumber)"
      >
        {{ $t('get-code') }}
      </button>
    </div>
    <div
      v-else-if="step === 'token'"
      class="step-verify"
    >
      {{ $t('enter-code-for-results') }}
      <input
        v-model="code"
        type="number"
        name="code"
        class="number"
        placeholder="123456"
      >
      <button
        class="button confirm"
        @click="submitCode({phoneNumber, code})"
      >
        {{ $t('enter') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { AuthStep } from '../store';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      phoneNumber: '',
      code: '',
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'authStep',
    ]),
    step() {
      return this.authStep === AuthStep.StartedVerification
        ? 'number'
        : 'token';
    },
  },
  methods: {
    ...mapActions([
      'storeAuthData',
      'getCode',
      'submitCode',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.login {
  font-size: 14px;

  .number {
    width: 150px;
    margin: 1.75rem 1rem 0;
  }
}
</style>
