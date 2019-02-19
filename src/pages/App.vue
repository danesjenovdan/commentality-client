<template>
  <div
    id="app"
    class="container"
  >
    <fake-article />
    <commentality article-id="83dab089fb294ed5b657bf0768c9e287" />
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
