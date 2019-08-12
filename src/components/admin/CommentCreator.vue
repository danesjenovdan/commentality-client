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
          class="col-2 col-form-label"
        >
          Statement
        </label>
        <div class="col-6">
          <input
            v-focus
            v-model="statement"
            type="text"
            class="form-control"
            @keypress.enter="createComment"
          >
        </div>
        <div class="col-4">
          <button
            class="btn btn-primary"
            @click="createComment"
          >
            Create&nbsp;statement
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
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
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
      this.statement = '';
      this.$emit('commentCreated');
    },
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
