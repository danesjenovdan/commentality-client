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
    <super-admin
      :authenticated="authenticated"
    />
    <div
      v-if="authenticated"
    >
      <div class="container pt-3">
        <div class="row">
          <div class="col-md-12">
            Long-term token (for developers):
            <input
              class="form-control"
              id="lt-token"
              :value="longTermToken.jwt_token"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SuperAdmin from '../components/admin/SuperAdmin.vue';
import Login from '../components/Login.vue';
import Articles from '../components/admin/Articles.vue';
import AnArticle from '../components/admin/Article.vue';
import { getArticlesByProperty, getMyProperties, refreshLongToken } from '../requests';

export default {
  name: 'Admin',
  components: {
    SuperAdmin,
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

    if (this.properties.length) {
      this.selectedPropertyId = this.properties[0].uid;
    }
    this.longTermToken = await refreshLongToken();
  },
};
</script>

<style lang="scss" src="@/scss/base.scss"></style>

<style lang="scss" scoped>
</style>
