<template>
  <div class="wrapper">
    <template v-if="finishedVoting">
      <h3 class="instructions">
        Javno mnenje
      </h3>
      <div class="sort">
        <span class="label">
          Razvrsti glede na
        </span>
        <template v-for="(criterion, i) in sortCriteria">
          <button
            :key="criterion.key"
            :class="[
              'option',
              criterion.key,
              { 'is-selected': currentSortCriterion === criterion.key }
            ]"
            @click="$emit('sort', criterion.key)"
            v-text="criterion.label"
          />
          <span
            v-if="i < (sortCriteria.length - 1)"
            :key="`${i}-divider`"
            class="divider"
            v-text="'/'"
          />
        </template>
      </div>
      <voted-post
        v-for="(post, index) in posts"
        :key="index"
        :text="post.text"
        :votes="post.votes"
      />
    </template>
    <template v-else>
      <h3 class="instructions">
        Za ogled javnega mnenja se opredeli do naslednjih trditev:
      </h3>
      <unvoted-post
        v-for="(post, index) in posts"
        v-show="!post.voted"
        :key="index"
        :text="post.text"
        @vote="$emit('vote', { type: $event, index })"
      />
    </template>
    <c-footer />
  </div>
</template>

<script>
import UnvotedPost from './UnvotedPost.vue';
import VotedPost from './VotedPost.vue';
import CFooter from './CFooter.vue';

export default {
  name: 'Commentality',
  components: {
    UnvotedPost,
    VotedPost,
    CFooter,
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
  data() {
    return {
      sortCriteria: [
        {
          key: 'yes',
          label: 'Strinjanje',
        },
        {
          key: 'no',
          label: 'Nestrinjanje',
        },
        {
          key: 'meh',
          label: 'Neopredeljenost',
        },
      ],
    };
  },
  computed: {
    finishedVoting() {
      const unvoted = this.posts.filter(post => !post.voted);
      return unvoted.length === 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 $wrapper-padding $wrapper-padding $wrapper-padding;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  font-family: $font-family;

  .instructions {
    text-align: center;
    font-style: italic;
    font-weight: 800;
    border-bottom: 2px solid $primary-color;
    margin-left: -$wrapper-padding;
    margin-right: -$wrapper-padding;
    padding: $wrapper-padding;
  }

  .sort {
    text-align: center;
    margin: $wrapper-padding 0;

    .label {
      margin-right: 0.4rem;
    }

    .option {
      cursor: pointer;
      text-transform: uppercase;
      border: none;
      background: transparent;
      font-family: $font-family;
      font-size: 1rem;
      font-weight: 800;
      font-style: italic;

      &:focus {
        outline: none;
      }

      @each $criterion, $color in $criteria-colors {
        &.#{$criterion} {
          &.is-selected,
          &:active,
          &:hover {
            color: $color;
          }
        }
      }
    }

    .divider {
      margin: 0 0.4rem;
    }
  }
}
</style>
