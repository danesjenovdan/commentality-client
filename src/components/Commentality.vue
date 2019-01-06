<template>
  <div class="wrapper">
    <template v-if="finishedVoting">
      <h3 class="instructions">
        Javno mnenje
      </h3>
      <div class="sort">
        Razvrsti glede na:<br>
        <span
          v-for="(label, criterion) in sortCriteria"
          :key="criterion"
          :class="{ 'is-selected': currentSortCriterion === criterion }"
          class="option"
          @click="$emit('sort', criterion)"
        >
          {{ label }}
        </span>
      </div>
      <voted-post
        v-for="(post, index) in posts"
        :key="index"
        :text="post.text"
        :votes="post.votes"
      />
    </template>

    <template v-else>
      <h3>Za ogled javnega mnenja se opredeli do naslednjih trditev</h3>
      <unvoted-post
        v-for="(post, index) in posts"
        v-show="!post.voted"
        :key="index"
        :text="post.text"
        @vote="$emit('vote', { type: $event, index })"
      />
    </template>
  </div>
</template>

<script>
import UnvotedPost from './UnvotedPost.vue';
import VotedPost from './VotedPost.vue';

export default {
  name: 'Commentality',
  components: {
    UnvotedPost,
    VotedPost,
  },
  props: {
    posts: {
      type: Array,
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
  },
  created() {
    this.sortCriteria = {
      yes: 'Strinjanje',
      no: 'Nestrinjanje',
      meh: 'Neopredeljenost',
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  border: 2px solid #ccc;
  padding: 0 1em;
}

.instructions {
  background: #ccc;
  margin: 0 -1em 1em -1em;
  text-align: center;
  line-height: 1.5;
}

.sort {
  .option {
    cursor: pointer;
    user-select: none;

    &:not(:last-child)::after { content: ' / '; }
    &.is-selected { font-weight: bold; }
  }
}
</style>
