<template>
  <div class="login">
    <div
      v-if="step === 'number'"
      class="step-begin"
    >
      <span class="instructions-text">{{ $t('enter-phone-for-code') }} <a href="mailto:commentality@danesjenovdan.si">{{ $t('more-info') }}</a></span>
      <vue-phone-number-input
        v-model="phoneNumber"
        default-country-code="SI"
        :no-validator-state="true"
        color="rgba(0, 0, 0, 0)"
        valid-color="rgba(0, 0, 0, 0)"
        placeholder=""
        :translations="{ phoneNumberLabel: '' }"
        @update="(o) => formattedNumber = o.formattedNumber"
      />
      <button
        class="button confirm"
        @click="fetchCode"
      >
        {{ $t('get-code') }}
      </button>
    </div>
    <div
      v-else-if="(step === 'token') && requireLogin"
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
        @click="submitCode({uid, code})"
      >
        {{ $t('enter') }}
      </button>
    </div>
    <div
      v-else-if="(step == 'token') && !requireLogin"
      class="step-verfiy"
    >
      {{ $t('creating-anonymous-identity') }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VuePhoneNumberInput from 'vue-phone-number-input';
import { AuthStep } from '../store';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: 'Login',
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      phoneNumber: '',
      code: '',
      formattedNumber: '',
      uid: null,
      propertyName: 'Commentality',
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'authStep',
      'requireLogin',
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
      'loginAnonymously',
    ]),
    async fetchCode() {
      // The server returns our number in a normalized format
      console.log(this.phoneNumber, this.propertyName);
      this.uid = await this.getCode({
        phoneNumber: this.formattedNumber,
        propertyName: this.propertyName
      });
    },
  },
  created() {
    if (!this.requireLogin) {
      console.log(this.requireLogin);
      console.log('PING!!!')
      this.loginAnonymously(this.propertyName);
    }
    if (typeof window !== 'undefined') {
      const match = window.location.href.match(/[?&]property_name=(.+?)(?:[&#]|$)/i);
      if (match && match.length > 1) {
        // eslint-disable-next-line prefer-destructuring
        this.propertyName = match[1];
        console.log('propertyName =', this.propertyName);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  font-size: 14px;

  .instructions-text {
    max-width: 280px;
  }

  .step-begin, .step-verify {
    display: flex;
    align-items: center;

    @media (max-width: 947px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  a {
    color: #000000;
  }

  .step-begin {
    /deep/ .vue-phone-number-input {

      margin: 0;

      @media (max-width: 767px) {
        & {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      }

      .field.is-focused input {
        border: none;
      }

      .field-input {
        border: 1px solid transparent;
        padding-top: 0;
        min-height: 0;
        $height: 1.625rem;
        height: $height;
      }

      .select-country-container {
        $height: 1.625rem;
        border: 1px solid $text-color;
        border-radius: $height / 2;
        height: $height;
        padding: 0 ($height / 3);
        margin-right: 10px;
        margin-left: 10px;

        .flag-container {
          top: 10.5px;
        }

        .country-selector-arrow {
          transform: matrix(1, 0, 0, 1, 0, 0);
          top: calc(50% - 11px)
        }

        .field-label {
          display: none;
        }
      }

      .input-phone-number {
        $height: 1.625rem;
        border: 1px solid $text-color;
        border-radius: $height / 2;
        height: $height;
        padding: 0 ($height / 3);
        margin-right: 10px;
        max-width: 130px;

        .field-label {
          display: none;
        }
      }
    }

    .button {
      flex-shrink: 0;

      @media (min-width: 768px) and (max-width: 947px) {
        & { margin-top: 0.5rem; }
      }
    }
  }

  .step-verify {
    .number {
      max-width: 5rem;
      margin: 0 1rem;

      @media (max-width: 767px) {
        & { margin: 1rem; }
      }
    }
  }
}
</style>
