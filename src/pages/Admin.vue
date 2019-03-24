<template>
  <div id="app" class="container-fluid">
    <div class="py-0 pt-4">
    </div>
    <div class="" style="">
      <div class="container">
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
          class="row"
        >
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
          <articles
            v-if="selectedPropertyId !== ''"
            :property-id="selectedPropertyId"
            @selectedArticleId="(uid) => selectedArticleId = uid"
          />

          <!-- single article below -->

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
          <an-article
            v-if="selectedArticleId !== ''"
            :article-id="selectedArticleId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Login from '../components/Login.vue';
import Articles from '../components/admin/Articles.vue';
import AnArticle from '../components/admin/Article.vue';
import { getArticlesByProperty, getMyProperties } from '../requests';

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
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
