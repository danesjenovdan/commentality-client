<template>
  <div
    id="app"
    class="container"
  >
    <fake-article />
    <commentality article-id="84a57b37a54c49d6820d2c7d609a48af" />
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

<style lang="scss" src="@/scss/base.scss" />
