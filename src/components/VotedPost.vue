<template>
  <div class="post">
    <p>{{ text }}</p>

    <div class="chart">
      <div
        v-for="(portion, name) in chartPortions"
        :key="name"
        :class="`portion ${name}`"
        :style="`width: ${portion}%`"
      >
        {{ Math.round(portion) }} %
      </div>
    </div>

    <div class="total">
      {{ allVotes }} glasov
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.post {
  border: 2px solid #ccc;
  font-size: 1.25rem;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;
}

.chart {
  display: flex;
  font-size: 1em;

  .portion {
    height: 2rem;
    line-height: 2rem;
  }

  .yes { background: #b7d4bc; }
  .meh { background: #d8d8d8; }
  .no { background: #efaeaf; }
}

.total {
  text-align: right;
}
</style>
