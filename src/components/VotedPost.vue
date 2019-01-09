<template>
  <div class="post">
    <div class="chart">
      <div class="labels">
        <div
          v-for="(portion, name) in chartPortions"
          :key="name"
          :class="['portion-label', name]"
          :style="`flex-basis: ${portion}%`"
        >
          <strong v-text="`${Math.round(portion)} %`" />
          <span v-text="keyToLabel(name)" />
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
const keyToLabelMap = {
  yes: 'strinjanje',
  no: 'nestrinjanje',
  meh: 'neopredeljenost',
};

export default {
  name: 'Post',
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
      return this.votes.yes + this.votes.meh + this.votes.no;
    },
    chartPortions() {
      return {
        yes: this.votes.yes / this.allVotes * 100,
        no: this.votes.no / this.allVotes * 100,
        meh: this.votes.meh / this.allVotes * 100,
      };
    },
  },
  methods: {
    keyToLabel(key) {
      return keyToLabelMap[key] || key;
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  border: 1px solid #f0f0f0;
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
    background-color: #f9f9f9;
    font-size: 1.5rem;
    font-weight: 200;
    border-radius: 12px;
  }
}
</style>
