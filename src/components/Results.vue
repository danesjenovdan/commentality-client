<template>
  <div class="results">
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
    <voted-comment
      v-for="(comment, index) in comments"
      :key="index"
      :text="comment.text"
      :votes="comment.votes"
    />
  </div>
</template>

<script>
import VotedComment from './VotedComment.vue';

export default {
  name: 'Results',
  components: {
    VotedComment,
  },
  props: {
    comments: {
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
          key: 'like',
          label: 'Strinjanje',
        },
        {
          key: 'dislike',
          label: 'Nestrinjanje',
        },
        {
          key: 'meh',
          label: 'Neopredeljenost',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.results {
  .sort {
    text-align: center;
    margin: $wrapper-padding 0;

    @media (max-width: 575.98px) {
      font-size: 0.75rem;
    }

    .label {
      margin-right: 0.4rem;
    }

    .option {
      padding: 0;
      cursor: pointer;
      text-transform: uppercase;
      border: none;
      background: transparent;
      font-family: $font-family;
      font-size: 1em;
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
      margin: 0 0.4em;

      @media (max-width: 575.98px) {
        font-size: 0.75rem;
      }
    }
  }
}
</style>
