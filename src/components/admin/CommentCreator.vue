<template>
  <div id="article-creator">
    <div
      v-if="!commentCreatorVisible"
      class="col-md-12"
    >
      <button
        class="btn btn-primary"
        @click="commentCreatorVisible = true"
      >
        Add new statement
      </button>
    </div>
    <div class="col-md-12" v-else>
      <div class="form-group row">
        <label
          for="inputmailh"
          class="col-3 col-form-label"
        >
          Statement
        </label>
        <div class="col-6">
          <input
            v-model="statement"
            type="text"
            class="form-control"
          >
        </div>
        <div class="col-3">
          <button
            class="btn btn-primary"
            @click="createComment"
          >
            Create statement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createComment } from '../../requests';

export default {
  name: 'ArticleCreator',
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      statement: '',
      commentCreatorVisible: false,
    };
  },
  methods: {
    async createComment() {
      await createComment(this.articleId, this.statement);
      this.commentCreatorVisible = false;
      this.$emit('commentCreated');
    },
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
