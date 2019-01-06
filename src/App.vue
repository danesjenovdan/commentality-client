<template>
  <div
    id="app"
    class="container"
  >
    <fake-article />
    <commentality
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
import { chain, cloneDeep } from 'lodash';

import Commentality from './components/Commentality.vue';
import Comments from './components/Comments.vue';
import FakeArticle from './components/FakeArticle.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Commentality,
    Comments,
    FakeArticle,
    Login,
  },
  data() {
    return {
      currentSortCriterion: null,
      posts: [
        {
          text: 'Šiško je neonacist in prav je, da je v zaporu.',
          voted: false,
          votes: {
            yes: 12,
            meh: 34,
            no: 56,
          },
        },
        {
          text: 'Sodniki so Soroševi plačanci.',
          voted: false,
          votes: {
            yes: 78,
            meh: 91,
            no: 23,
          },
        },
        {
          text: 'Jaz sem s Ptuja in Štajerska varda je edina vojska, ki jo priznavam.',
          voted: false,
          votes: {
            yes: 45,
            meh: 67,
            no: 89,
          },
        },
      ],
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
          const allVotes = post.votes.yes + post.votes.meh + post.votes.no;
          return post.votes[this.currentSortCriterion] / allVotes;
        })
        .reverse()
        .value();
    },
  },
  methods: {
    updateVote({ type, index }) {
      const newPosts = cloneDeep(this.posts);
      newPosts[index].voted = true;
      newPosts[index].votes[type] += 1;
      this.posts = newPosts;
    },
    updateSort(newSortCriterion) {
      this.currentSortCriterion = newSortCriterion;
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {margin-bottom: 0.5em;}

html {
  font-size: 18px;
}

body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  overflow-y: scroll;
}

p {
  line-height: 1.5em;
  margin-bottom: 1em;
}

.container {
  max-width: 960px;
  padding: 1.5rem;
  margin: 0 auto;
}
</style>
