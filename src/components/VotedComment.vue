<template>
  <div class="comment">
    <div class="chart">
      <div class="labels">
        <div
          v-for="(portion, name) in chartPortions"
          :key="name"
          :class="['portion-label', name]"
          :style="`flex-basis: ${portion}%`"
        >
          <strong v-text="`${Math.round(portion)} %`" />
          <span v-text="$t(`result-labels.${name}`)" />
        </div>
      </div>
      <div class="bars">
        <div
          v-for="(portion, name) in chartPortions"
          :key="name"
          :class="['portion-bar', name]"
          :style="`flex-basis: ${portion}%`"
        />
      </div>
    </div>
    <p
      class="text"
      v-text="text"
    />
  </div>
</template>

<script>
export default {
  name: 'VotedComment',
  props: {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Object,
      required: true,
    },
  },
  computed: {
    allVotes() {
      return this.votes.like + this.votes.dislike + this.votes.meh;
    },
    chartPortions() {
      return {
        like: this.votes.like / this.allVotes * 100,
        meh: this.votes.meh / this.allVotes * 100,
        dislike: this.votes.dislike / this.allVotes * 100,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  border: 1px solid $border-color;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;

  .chart {
    .labels,
    .bars {
      display: flex;
    }

    .portion-label,
    .portion-bar {
      flex-shrink: 1;
      flex-grow: 1;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }

    .portion-label {
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;
      font-style: italic;
      line-height: 1;
      margin: 0 0.25rem 0.5rem 0.25rem;

      strong {
        font-weight: 800;
      }

      span {
        font-weight: 200;
      }
    }

    .portion-bar {
      height: 12px;
      border-radius: 12px;

      @each $criterion, $color in $criteria-colors {
        &.#{$criterion} {
          background: $color;
        }
      }
    }
  }

  .text {
    margin: 1rem 0 0 0;
    padding: 3rem;
    background-color: $bg-accent-color;
    font-size: 1.65rem;
    font-weight: 200;
    border-radius: 12px;

    @media (max-width: 575.98px) {
      padding: 1rem;
      font-size: 1.25rem;
    }
  }
}
</style>
