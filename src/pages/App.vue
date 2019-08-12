<template>
  <div
    id="app"
    class="container"
  >
    <fake-article />
    <commentality article-id="1204c865b9dd4fb68ab4d63be6c5999b" />
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
