<template>
  <div id="app" class="container">
    <div class="container pb-3">
      <div class="row">
        <article-creator
          property-id="bba4266cf6264de1ae5a85217e3e0935"
          @articleCreated="refreshArticles"
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
                  <th>Name&nbsp;</th>
                  <th>Visible statements</th>
                  <th style="">Hidden statements</th>
                  <th style="">Toggle commenting</th>
                  <th style="">Toggle voting</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="article in articles"
                  :key="article.uid"
                >
                  <td>
                    <a href="">
                      {{ article.title }}
                    </a>
                  </td>
                  <td class="">
                    {{ article.visibleComments.length }}
                  </td>
                  <td class="">
                    {{ article.hiddenComments.length }}
                  </td>
                  <td class="">
                    <commenting-toggle
                      :article-id="article.uid"
                      :can-comment="article.canComment"
                      @commentingEnabled="refreshArticles"
                      @commentingDisabled="refreshArticles"
                    />
                  </td>
                  <td class="">
                    <voting-toggle
                      :article-id="article.uid"
                      :can-vote="article.canVote"
                      @votingEnabled="refreshArticles"
                      @votingDisabled="refreshArticles"
                    />
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
import ArticleCreator from './ArticleCreator.vue';
import CommentingToggle from './CommentingToggle.vue';
import VotingToggle from './VotingToggle.vue';
import { getArticlesByProperty } from '../../requests';

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
    },
  },
  mounted() {
    this.refreshArticles();
  },
  methods: {
    async refreshArticles() {
      this.articles = await getArticlesByProperty(this.propertyId);
    },
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
