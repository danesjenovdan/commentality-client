<template>
  <div class="btn-group">
    <button
      :class="['btn', {'btn-outline-primary': !canVote, 'btn-primary': canVote}]"
      @click="enableVoting"
    >
      ON
    </button>
    <button
      :class="['btn', {'btn-outline-primary': canVote, 'btn-primary': !canVote}]"
      @click="disableVoting"
    >
      OFF
    </button>
  </div>
</template>

<script>
import { patchArticle } from '../../requests';

export default {
  name: 'VotingToggle',
  props: {
    articleId: {
      type: String,
      required: true,
    },
    canVote: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async enableVoting() {
      if (!this.canVote) {
        await patchArticle(this.articleId, {
          canVote: true,
        });
        this.$emit('votingEnabled');
      }
    },
    async disableVoting() {
      if (this.canVote) {
        await patchArticle(this.articleId, {
          canVote: false,
        });
        this.$emit('votingDisabled');
      }
    },
  },
};
</script>

<style lang="scss">
</style>
