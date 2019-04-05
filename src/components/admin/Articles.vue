<template>
  <div class="pt-3">
    <div class="row pb-3">
      <article-creator
        property-id="bba4266cf6264de1ae5a85217e3e0935"
        @articleCreated="refreshArticles"
      />
    </div>
    <div class="row pb-3">
      <div class="col-md-12">
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <th>Name&nbsp;</th>
                <th style="">Commenting</th>
                <th style="">Voting</th>
                <th>Unique ID</th>
                <th>Danger zone</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="article in articles"
                :key="article.uid"
              >
                <td>
                  <a
                    href="#"
                    @click.prevent="$emit('selectedArticleId', article.uid)"
                  >
                    {{ article.title }}
                  </a>
                </td>
                <td class="">
                  <commenting-toggle
                    :article-id="article.uid"
                    :can-comment="article.can_comment"
                    @commentingEnabled="refreshArticles"
                    @commentingDisabled="refreshArticles"
                  />
                </td>
                <td class="">
                  <voting-toggle
                    :article-id="article.uid"
                    :can-vote="article.can_vote"
                    @votingEnabled="refreshArticles"
                    @votingDisabled="refreshArticles"
                  />
                </td>
                <td class="">
                  {{ article.uid }}
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="deleteArticle(article.uid)"
                  >Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCreator from './ArticleCreator.vue';
import CommentingToggle from './CommentingToggle.vue';
import VotingToggle from './VotingToggle.vue';
import { getArticlesByProperty, deleteArticle } from '../../requests';

export default {
  name: 'Articles',
  components: {
    ArticleCreator,
    CommentingToggle,
    VotingToggle,
  },
  props: {
    propertyId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      articles: [],
    };
  },
  watch: {
    propertyId(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.refreshArticles();
    },
  },
  mounted() {
    this.refreshArticles();
  },
  methods: {
    async refreshArticles() {
      this.articles = await getArticlesByProperty(this.propertyId);
      console.log(this.articles);
    },
    async deleteArticle(uid) {
      await deleteArticle(uid);
      this.articles.splice(this.articles.findIndex(e => e.uid === uid), 1);
      this.$emit('articleDeleted');
    },
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
</style>

<style lang="scss">
  .table {
    thead, tbody {
      display: block;
    }

    tbody {
      height: 400px;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    th {
      width: 200px;
    }
    td {
      word-break: keep-all;
    }
  }
</style>