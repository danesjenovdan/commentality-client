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
    <sort v-model="currentSortCriterion" />
    <transition
      name="fade"
      mode="out-in"
    >
      <comments
        class="scroll-container"
        :comments="comments"
        @vote="sendVote"
      />
    </transition>
    <transition
      name="fade"
      mode="out-in"
    >
      <comment-input
        class="comment-input-container"
        :article-id="articleId"
        :finished-voting="finishedVoting"
        v-if="commentingAllowed"
      />
    </transition>
    <c-footer />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { findIndex } from 'lodash';

import sortBy, { SortCriterion } from '../sort';
import {
  createComment, getArticle, voteOnComment,
} from '../requests';
import Comments from './Comments.vue';
import CommentInput from './CommentInput.vue';
import CFooter from './CFooter.vue';
import Sort from './Sort.vue';

export default {
  name: 'Commentality',
  components: {
    Comments,
    CommentInput,
    CFooter,
    Sort,
  },
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      article: null,
      currentSortCriterion: SortCriterion.Time,
      commentingAllowed: false,
    };
  },
  computed: {
    ...mapGetters(['userId']),
    finishedVoting() {
      if (this.article) {
        const unvoted = this.comments
          .filter(comment => comment.voterIds.indexOf(this.userId) === -1);
        return unvoted.length === 0;
      }
      return false;
    },
    commented() {
      if (this.article) {
        return this.article.commenters.indexOf(this.userId) > -1;
      }
      return false;
    },
    title() {
      return this.finishedVoting
        ? this.$t('public-opinion')
        : this.$t('please-vote-to-see-opinion');
    },
    comments() {
      if (this.article) {
        return sortBy(this.article.visibleComments, this.currentSortCriterion);
      }
      return [];
    },
  },
  async created() {
    await this.refreshJwtToken();
    this.fetchComments();
  },
  methods: {
    ...mapActions([
      'refreshJwtToken',
    ]),
    ...mapMutations([
      'SET_REQUIRE_LOGIN',
    ]),
    async fetchComments() {
      const article = await getArticle(this.articleId);
      console.log(article);
      this.article = article;
      this.commentingAllowed = article.canComment;
      this.SET_REQUIRE_LOGIN(article.requireLogin);
    },
    async sendVote({ uid, type }) {
      const updatedComment = await voteOnComment(uid, type);
      const updatedCommentIndex = findIndex(
        this.article.visibleComments,
        { uid },
      );
      this.$set(
        this.article.visibleComments,
        updatedCommentIndex,
        updatedComment,
      );
    },
    async sendComment(contents) {
      createComment(this.article.uid, contents);
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
  margin-left: -$wrapper-padding;
  margin-right: -$wrapper-padding;
  padding: 0 $wrapper-padding;
  flex: 1 1 auto;

  @media (max-width: 575.98px) {
    padding: 0 #{$wrapper-padding / 2};
  }
}

.comment-input-container {
  @media (max-width: 575.98px) {
    margin: 0 -1rem;
  }
}

.wrapper {
  padding: 0 $wrapper-padding;
  border-radius: 12px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.1);
  font-family: $font-family;
  background: $bg-color;
  display: flex;
  flex-direction: column;


  .instructions {
    font-size: 0.8rem;
    text-align: center;
    font-style: italic;
    font-weight: 800;
    border-bottom: 1px solid $primary-color;
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
