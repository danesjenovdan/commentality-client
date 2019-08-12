<template>
  <div id="article-creator">
    <div
      v-if="!articleCreatorVisible"
      class="col-md-12"
    >
      <button
        class="btn btn-primary"
        @click="articleCreatorVisible = true"
      >
        Add new article
      </button>
    </div>
    <div class="col-md-12" v-else>
      <div class="form-group row">
        <label
          for="inputmailh"
          class="col-4 col-form-label"
        >
          Name of the article
        </label>
        <div class="col-4">
          <input
            v-focus
            v-model="articleName"
            type="text"
            class="form-control"
            @keypress.enter="createArticle"
          >
        </div>
        <div class="col-4">
          <button
            class="btn btn-primary"
            @click="createArticle"
          >
            Create article
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '../../requests';

export default {
  name: 'ArticleCreator',
  props: {
    propertyId: {
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
      articleName: '',
      articleCreatorVisible: false,
    };
  },
  methods: {
    async createArticle() {
      await createArticle(this.articleName, this.propertyId);
      this.articleCreatorVisible = false;
      this.articleName = '';
      this.$emit('articleCreated');
    },
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
