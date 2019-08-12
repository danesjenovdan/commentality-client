<template>
  <div class="pt-3">
    <div class="row pb-3">
      <article-creator
        :property-id="propertyId"
        @articleCreated="refreshArticles"
      />
    </div>
    <div class="row pb-3">
      <div class="col-md-12">
        <ul class="table">
          <li
            v-for="article in articles"
            :key="article.uid"
          >
            <div class="name">
              <a
                href="#"
                @click.prevent="selectedArticleId = article.uid"
              >
                {{ article.title }}
              </a>
            </div>
            <div>
              Commenting
              <commenting-toggle
                :article-id="article.uid"
                :can-comment="article.can_comment"
                @commentingEnabled="refreshArticles"
                @commentingDisabled="refreshArticles"
              />
            </div>
            <!-- <div>
              Voting
              <voting-toggle
                :article-id="article.uid"
                :can-vote="article.can_vote"
                @votingEnabled="refreshArticles"
                @votingDisabled="refreshArticles"
              />
            </div> -->
            <div>
              Login required
              <login-toggle
                :article-id="article.uid"
                :require-login="article.require_login"
                @loginON="refreshArticles"
                @loginOFF="refreshArticles"
              />
            </div>
            <div>
              Article ID<br>
              {{ article.uid }}
            </div>
            <div>
              <button
                class="btn btn-danger"
                @click="deleteArticle(article.uid)"
              >Delete</button>
            </div>
            <div class="statements">
              <an-article
                v-if="selectedArticleId == article.uid"
                :article-id="selectedArticleId"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCreator from './ArticleCreator.vue';
import CommentingToggle from './CommentingToggle.vue';
import VotingToggle from './VotingToggle.vue';
import LoginToggle from './LoginToggle.vue';
import AnArticle from './Article.vue';
import { getArticlesByProperty, deleteArticle } from '../../requests';

export default {
  name: 'Articles',
  components: {
    ArticleCreator,
    CommentingToggle,
    VotingToggle,
    LoginToggle,
    AnArticle,
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
      selectedArticleId: '',
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
  ul.table {
    list-style: none;
    margin: 0;
    padding: 0;

    overflow-y: auto;

    li {

      align-items: center;
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      border-bottom: 1px solid #f0f0f0;
      padding: 8px 0;

      div {
        flex: 1;
        margin: 0 8px;
        text-align: center;

        &.name {
          min-width: 80px;
          overflow-y: auto;
        }
      }

      .statements {
        width: 100%;
      }
    }
  }
</style>
