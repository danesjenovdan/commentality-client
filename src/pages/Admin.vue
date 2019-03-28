<template>
  <div id="app">
    <div
      v-if="!authenticated"
      class="row"
    >
      <div class="col-md-12">
        <login />
      </div>
    </div>
    <div
      v-if="authenticated"
    >
      <div class="container pt-3">
        <div class="row">
          <div class="col-md-12">
            Long-term token (for developers): <span id="lt-token">{{ longTermToken.jwt_token }}</span>
          </div>
        </div>
      </div>
      <div class="container pt-3 pb-3">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <select
              v-model="selectedPropertyId"
              class="form-control"
            >
              <option disabled value="">Select your property</option>
              <option
                v-for="property in properties"
                :key="property.uid"
                :value="property.uid"
              >
                {{ property.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <articles
        v-if="selectedPropertyId !== ''"
        :property-id="selectedPropertyId"
        @selectedArticleId="(uid) => selectedArticleId = uid"
      />

      <!-- single article below -->

      <div class="container pt-3 pb-3">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <select
              v-if="selectedPropertyId !== ''"
              v-model="selectedArticleId"
              class="form-control"
            >
              <option disabled value="">Select your article</option>
              <option
                v-for="article in articles"
                :key="article.uid"
                :value="article.uid"
              >
                {{ article.title }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <an-article
        v-if="selectedArticleId !== ''"
        :article-id="selectedArticleId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Login from '../components/Login.vue';
import Articles from '../components/admin/Articles.vue';
import AnArticle from '../components/admin/Article.vue';
import { getArticlesByProperty, getMyProperties, refreshLongToken } from '../requests';

export default {
  name: 'Admin',
  components: {
    Login,
    Articles,
    AnArticle,
  },
  data() {
    return {
      selectedArticleId: '',
      articles: [],
      selectedPropertyId: '',
      properties: [],
      longTermToken: {},
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  watch: {
    authenticated(newValue) {
      if (newValue === true) {
        // this.selectedPropertyId = this.properties[0].uid;
        // TODO not sure what I wanted to do here
      }
    },
    async selectedPropertyId(newValue) {
      this.articles = await getArticlesByProperty(newValue);
    },
  },
  methods: {
    ...mapActions([
      'startVerification',
      'refreshJwtToken',
    ]),
  },
  async created() {
    this.startVerification();
    await this.refreshJwtToken();

    this.properties = await getMyProperties();
    this.selectedPropertyId = this.properties[0].uid;
    this.longTermToken = await refreshLongToken();
  },
};
</script>

<style lang="scss" src="@/scss/base.scss"></style>

<style lang="scss" scoped>
#lt-token {
  width: 200px;
  overflow-x: auto;
  display: inline-block;
  background: rgba(0, 0, 0, 0.2);
}
</style>
