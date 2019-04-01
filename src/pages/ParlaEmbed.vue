<template>
  <div
    id="app"
    class="container"
  >
    <commentality
      v-if="articleId"
      :article-id="articleId"
    />
  </div>
</template>

<script>
import Commentality from '../components/ParlaCommentality.vue';

export default {
  name: 'App',
  components: {
    Commentality,
  },
  data() {
    return {
      articleId: null,
    };
  },
  computed: {
  },
  mounted() {
    console.log('mounted');
    if (typeof window !== 'undefined') {
      const match = window.location.hash.match(/[#&?]id=(.+?)(?:[&]|$)/i);
      if (match && match.length > 1) {
        // eslint-disable-next-line prefer-destructuring
        this.articleId = match[1];
        console.log('article id =', this.articleId);
      }
    }
  },
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;

  *, *:before, *:after {
    box-sizing: inherit;
  }

  &,
  body.embed-html {
    margin: 0;
    padding: 0;
    font-size: 18px;
    background: transparent;
  }

  body.embed-html {
    font-size: 1rem;
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  padding: 0;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 575.98px) {
    padding: 0;
  }
}
</style>
