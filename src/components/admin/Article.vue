<template>
  <div class="container">
    <div class="container pb-3">
      <div class="row">
        <comment-creator
          :article-id="articleId"
          @commentCreated="getComments"
        />
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive" style="">
            <table class="table">
              <thead>
                <tr>
                  <th>Text</th>
                  <th>Status</th>
                  <th style="">Moderate</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="statement in comments"
                  :key="statement.uid"
                >
                  <td><input class="form-control" v-model="statement.contents" /></td>
                  <td class="">{{ statement.pending ? 'Pending' : statement.visible ? 'Visible' : 'Hidden'}}</td>
                  <td class="">
                    <visibility-toggle
                      :comment-id="statement.uid"
                      :is-visible="statement.visible"
                      @commentingEnabled="getComments"
                      @commentingDisabled="getComments"
                    />
                  </td>
                  <td>
                    <button class="btn btn-default" @click="patchComment(statement.uid, statement.contents)">Save</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCreator from './CommentCreator.vue';
import VisibilityToggle from './VisibilityToggle.vue';
import { getArticle, patchComment } from '../../requests';

export default {
  name: 'AnArticle',
  components: {
    CommentCreator,
    VisibilityToggle,
  },
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    async getComments() {
      const article = await getArticle(this.articleId);
      this.comments = article.visibleComments.concat(article.hiddenComments).sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt));
    },
    async patchComment(commentId, contents) {
      const comment = await patchComment(commentId, contents);
      if (comment.contents === contents) {
        alert('Uspešno shranjeno!');
      } else {
        alert('Nekaj je šlo narobe. :( Poglej v konzolo in/ali poskusi ponovno.')
      }
    },
  },
  watch: {
    articleId() {
      this.getComments();
    },
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
