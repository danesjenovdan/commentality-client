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
          class="col-3 col-form-label"
        >
          Name of the article
        </label>
        <div class="col-6">
          <input
            v-model="articleName"
            type="text"
            class="form-control"
          >
        </div>
        <div class="col-3">
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
      this.$emit('articleCreated');
    },
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
