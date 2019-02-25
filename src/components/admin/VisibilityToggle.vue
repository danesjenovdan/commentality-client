<template>
  <div class="btn-group">
    <button
      :class="['btn', {'btn-outline-primary': !isVisible, 'btn-primary': isVisible}]"
      @click="showStatement"
    >
      Visible
    </button>
    <button
      :class="['btn', {'btn-outline-primary': isVisible, 'btn-primary': !isVisible}]"
      @click="hideStatement"
    >
      Hidden
    </button>
  </div>
</template>

<script>
import { showComment, hideComment } from '../../requests';

export default {
  name: 'CommentModerator',
  props: {
    commentId: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async showStatement() {
      if (!this.isVisible) {
        await showComment(this.commentId);
        this.$emit('commentingEnabled');
      }
    },
    async hideStatement() {
      if (this.isVisible) {
        await hideComment(this.commentId);
        this.$emit('commentingDisabled');
      }
    },
  },
};
</script>

<style lang="scss">
</style>
