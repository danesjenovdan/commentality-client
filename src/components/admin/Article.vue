<template>
  <div class="container">
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
                </tr>
              </thead>
              <tbody>
                <tr v-for="statement in comments" :key="statement.uid">
                  <td>
                    <div class="input-group">
                      <input
                        class="form-control"
                        v-model="statement.contents"
                        @keypress.enter="patchComment(statement.uid, statement.contents)"
                      />
                      <span class="input-group-btn">
                        <button class="btn btn-default" @click="patchComment(statement.uid, statement.contents)">
                          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 49 49" style="enable-background:new 0 0 49 49;" xml:space="preserve">
                            <g>
                              <path d="M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5 V2h7v16h28V2h1.586L46.5,9.414V47z" />
                              <path d="M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z" />
                              <path d="M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z" />
                              <path d="M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37 c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z" />
                              <path d="M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z" />
                            </g>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </td>
                  <td class="">{{ statement.pending ? 'New' : statement.visible ? 'Visible' : 'Hidden'}}</td>
                  <td class="">
                    <visibility-toggle :comment-id="statement.uid" :is-visible="statement.visible" @commentingEnabled="getComments" @commentingDisabled="getComments" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <comment-creator :article-id="articleId" @commentCreated="getComments" />
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

<style lang="scss">
  button svg {
    width: 20px;
  }
</style>

<style lang="scss" src="@/scss/base.scss" />
