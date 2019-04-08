<template>
  <div class="login">
    <div
      v-if="step === 'number'"
      class="step-begin"
    >
      {{ $t('enter-phone-for-code') }}
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
    async fetchCode() {
      // The server returns our number in a normalized format
      this.phoneNumber = await this.getCode(this.formattedNumber);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  font-size: 14px;

  .step-begin, .step-verify {
    display: flex;
    align-items: center;

    @media (max-width: 947px) {
      flex-wrap: wrap;
      justify-content: center;
    }
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
