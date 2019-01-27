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
      <comments
        class="scroll-container"
        :comments="comments"
        :current-sort-criterion="currentSortCriterion"
        @vote="sendVote"
        @sort="updateSort"
      />
    </transition>
    <c-footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
  chain, cloneDeep, concat, findIndex, includes, mapValues, sum, values,
} from 'lodash';

// import Results from './Results.vue';
import Comments from './Comments.vue';
import CFooter from './CFooter.vue';
import { getArticle, voteOnComment } from '../requests';


export default {
  name: 'Commentality',
  components: {
    Comments,
    CFooter,
  },
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rawComments: [],
      currentSortCriterion: null,
    };
  },
  computed: {
    ...mapGetters(['userId']),
    finishedVoting() {
      const unvoted = this.comments.filter(comment => !comment.voted);
      return unvoted.length === 0;
    },
    title() {
      return this.finishedVoting
        ? this.$t('public-opinion')
        : this.$t('please-vote-to-see-opinion');
    },
    comments() {
      let comments = this.rawComments;

      if (this.currentSortCriterion !== null) {
        comments = chain(comments)
          .cloneDeep()
          .sortBy((comment) => {
            const voteCounts = mapValues(
              comment.votes,
              vote => vote.length,
            );
            const allVotes = sum(values(voteCounts));
            return voteCounts[this.currentSortCriterion] / allVotes;
          })
          .reverse()
          .value();
      }

      return comments.map(comment => ({
        text: comment.contents,
        votes: {
          like: comment.votes.like.length,
          meh: comment.votes.meh.length,
          dislike: comment.votes.dislike.length,
        },
        voted: includes(
          concat(...values(comment.votes)),
          this.userId,
        ),
        uid: comment.uid,
      }));
    },
  },
  async created() {
    await this.login();
    this.fetchcomments();
  },
  methods: {
    ...mapActions(['login']),
    async fetchcomments() {
      const article = await getArticle(this.articleId);
      this.rawComments = article.comments;
    },
    async sendVote({ uid, type }) {
      const updatedComment = await voteOnComment(uid, type);
      const newComments = cloneDeep(this.rawComments);
      const updatedCommentIndex = findIndex(
        newComments,
        { uid: updatedComment.uid },
      );

      newComments[updatedCommentIndex] = updatedComment;
      this.rawComments = newComments;
    },
    updateSort(newSortCriterion) {
      this.currentSortCriterion = newSortCriterion;
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
