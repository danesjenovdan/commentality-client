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
import Commentality from '../components/Commentality.vue';

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
    if (typeof window !== 'undefined') {
      const match = window.location.hash.match(/[#&?]id=(.+?)(?:[?&]|$)/i);
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
@import url('https://fonts.googleapis.com/css?family=Sarabun:200,200i,400,700,700i,800,800i&subset=latin-ext');

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
  }
}
</style>

<style lang="scss" scoped>
.container {
  max-width: 960px;
  padding: $container-padding;
  margin: 0 auto;

  @media (max-width: 575.98px) {
    padding: 0;
  }
}
</style>
