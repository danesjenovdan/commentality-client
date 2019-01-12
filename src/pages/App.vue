<template>
  <div
    id="app"
    class="container"
  >
    <fake-article />
    <commentality
      article-id="mladina-random-id-12345"
      :posts="sortedPosts"
      :current-sort-criterion="currentSortCriterion"
      @vote="updateVote"
      @sort="updateSort"
    />
    <!-- <login v-if="!authenticated" />
    <comments v-else /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { chain, cloneDeep, find } from 'lodash';
import FakeArticle from '../components/FakeArticle.vue';
import Commentality from '../components/Commentality.vue';
// import Comments from '../components/Comments.vue';
// import Login from '../components/Login.vue';

export default {
  name: 'App',
  components: {
    FakeArticle,
    Commentality,
    // Comments,
    // Login,
  },
  data() {
    return {
      currentSortCriterion: null,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
    sortedPosts() {
      if (this.currentSortCriterion === null) {
        return this.posts;
      }

      return chain(this.posts)
        .cloneDeep()
        .sortBy((post) => {
          const allVotes = post.votes.like + post.votes.meh + post.votes.dislike;
          return post.votes[this.currentSortCriterion] / allVotes;
        })
        .reverse()
        .value();
    },
  },
  methods: {
    updateVote({ post, vote }) {
      const newPosts = cloneDeep(this.posts);
      const newPost = find(newPosts, p => p.text === post.text);
      newPost.voted = true;
      newPost.votes[vote] += 1;
      this.posts = newPosts;
    },
    updateSort(newSortCriterion) {
      this.currentSortCriterion = newSortCriterion;
    },
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
