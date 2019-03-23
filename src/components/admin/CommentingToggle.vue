<template>
  <div class="btn-group">
    <button
      :class="['btn', {'btn-outline-primary': !canComment, 'btn-primary': canComment}]"
      @click="enableCommenting"
    >
      ON
    </button>
    <button
      :class="['btn', {'btn-outline-primary': canComment, 'btn-primary': !canComment}]"
      @click="disableCommenting"
    >
      OFF
    </button>
  </div>
</template>

<script>
import { patchArticle } from '../../requests';

export default {
  name: 'CommentingToggle',
  props: {
    articleId: {
      type: String,
      required: true,
    },
    canComment: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async enableCommenting() {
      if (!this.canComment) {
        await patchArticle(this.articleId, {
          canComment: true,
        });
        this.$emit('commentingEnabled');
      }
    },
    async disableCommenting() {
      if (this.canComment) {
        await patchArticle(this.articleId, {
          canComment: false,
        });
        this.$emit('commentingDisabled');
      }
    },
  },
};
</script>

<style lang="scss">
</style>
