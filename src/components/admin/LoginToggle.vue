<template>
  <div class="btn-group">
    <button
      :class="['btn', {'btn-outline-primary': !requireLogin, 'btn-primary': requireLogin}]"
      @click="loginON"
    >
      Yes
    </button>
    <button
      :class="['btn', {'btn-outline-primary': requireLogin, 'btn-primary': !requireLogin}]"
      @click="loginOFF"
    >
      No
    </button>
  </div>
</template>

<script>
import { patchArticle } from '../../requests';

export default {
  name: 'LoginToggle',
  props: {
    articleId: {
      type: String,
      required: true,
    },
    requireLogin: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async loginON() {
      if (!this.requireLogin) {
        await patchArticle(this.articleId, {
          require_login: true,
        });
        this.$emit('loginON');
      }
    },
    async loginOFF() {
      if (this.requireLogin) {
        await patchArticle(this.articleId, {
          require_login: false,
        });
        this.$emit('loginOFF');
      }
    },
  },
};
</script>

<style lang="scss">
</style>
