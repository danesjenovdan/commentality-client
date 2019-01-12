<template>
  <div class="wrapper">
    <h3 class="instructions">
      <transition
        name="fade"
        mode="out-in"
      >
        <span
          :key="title"
          v-text="title"
        />
      </transition>
    </h3>
    <transition
      name="fade"
      mode="out-in"
    >
      <results
        v-if="finishedVoting"
        class="scroll-container"
        :posts="posts"
        :current-sort-criterion="currentSortCriterion"
        @sort="$emit('sort', $event)"
      />
      <voting
        v-else
        class="scroll-container"
        :posts="posts"
        @vote="$emit('vote', $event)"
      />
    </transition>
    <c-footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Results from './Results.vue';
import Voting from './Voting.vue';
import CFooter from './CFooter.vue';
import { getArticle } from '../requests';


export default {
  name: 'Commentality',
  components: {
    Results,
    Voting,
    CFooter,
  },
  data() {
    return {
      rawPosts: [],
    };
  },
  props: {
    articleId: {
      type: String,
      required: true,
    },
    currentSortCriterion: {
      type: String,
      default: '',
    },
  },
  computed: {
    finishedVoting() {
      const unvoted = this.posts.filter(post => !post.voted);
      return unvoted.length === 0;
    },
    title() {
      return this.finishedVoting
        ? 'Javno mnenje'
        : 'Za ogled javnega mnenja se opredeli do naslednjih trditev';
    },
    posts() {
      return this.rawPosts.map(post => ({
        text: post.contents,
        votes: post.vote_count,
        voted: false,
      }));
    },
  },
  async created() {
    await this.login();
    this.fetchPosts();
  },
  methods: {
    ...mapActions(['login']),
    async fetchPosts() {
      const article = await getArticle(this.articleId);
      this.rawPosts = article.comments;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.scroll-container {
  overflow-x: hidden;
  overflow-y: scroll;
  margin-left: -$wrapper-padding;
  margin-right: -$wrapper-padding;
  padding: 0 $wrapper-padding;
  flex: 1 1 auto;

  @media (max-width: 575.98px) {
    padding: 0 #{$wrapper-padding / 2};
  }
}

.wrapper {
  padding: 0 $wrapper-padding;
  border-radius: 12px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.1);
  font-family: $font-family;
  background: $bg-color;
  height: calc(100vh - #{$container-padding * 2});
  display: flex;
  flex-direction: column;

  @media (max-width: 575.98px) {
    height: 100vh;
  }

  .instructions {
    text-align: center;
    font-style: italic;
    font-weight: 800;
    border-bottom: 2px solid $primary-color;
    margin: 0 #{-$wrapper-padding};
    padding: $wrapper-padding;
    flex: 0 0 auto;

    @media (max-width: 575.98px) {
      padding: $wrapper-padding / 2;
      font-size: 1rem;
    }
  }
}

footer {
  $pad: $wrapper-padding / 2;
  padding: $pad;
  margin: 0 #{-$wrapper-padding};
  border-top: 2px solid $primary-color;
  flex: 0 0 auto;

  @media (max-width: 575.98px) {
    padding: $pad / 2;
  }
}
</style>
