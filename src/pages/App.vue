<template>
  <div
    id="app"
    class="container"
  >
    <fake-article />
    <commentality article-id="mladina-random-id-12345" />
  </div>
</template>

<script>
import FakeArticle from '../components/FakeArticle.vue';
import Commentality from '../components/Commentality.vue';

export default {
  name: 'App',
  components: {
    FakeArticle,
    Commentality,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Sarabun:200,200i,400,700,700i,800,800i&subset=latin-ext');

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html,
body {
  margin: 0;
  padding: 0;
  font-size: 18px;
}

body {
  font-size: 1rem;
  overflow-y: scroll;
}

.container {
  max-width: 960px;
  padding: 1.5rem;
  margin: 0 auto;
}
</style>
