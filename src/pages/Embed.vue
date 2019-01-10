<template>
  <div
    id="app"
    class="container"
  >
    <commentality
      :posts="sortedPosts"
      :current-sort-criterion="currentSortCriterion"
      @vote="updateVote"
      @sort="updateSort"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { chain, cloneDeep, find } from 'lodash';
import Commentality from '../components/Commentality.vue';

export default {
  name: 'App',
  components: {
    Commentality,
  },
  data() {
    return {
      articleId: null,
      currentSortCriterion: 'yes',
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
            meh: 2,
            no: 3,
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
  mounted() {
    if (typeof window !== 'undefined') {
      const match = window.location.hash.match(/[#&?]id=(.+?)(?:[&]|$)/i);
      if (match && match.length > 1) {
        // eslint-disable-next-line prefer-destructuring
        this.articleId = match[1];
        console.log('article id =', this.articleId);
      }
    }
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
  background: transparent;
}

body {
  font-size: 1rem;
  overflow: hidden;
}

.container {
  max-width: 960px;
  padding: $container-padding;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 575.98px) {
    padding: 0;
  }
}
</style>
