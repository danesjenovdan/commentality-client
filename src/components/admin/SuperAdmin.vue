<template>
  <div id="superadmin" class="container">
    <div
      v-if="authenticated"
    >
      <div class="row">
        <div class="col-md-12">
          <h1>Properties</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
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
      <articles
        v-if="selectedPropertyId !== ''"
        :property-id="selectedPropertyId"
        @selectedArticleId="(uid) => selectedArticleId = uid"
      />
      <an-article
        v-if="selectedArticleId !== ''"
        :article-id="selectedArticleId"
      />
    </div>
  </div>
</template>

<script>
import Articles from './Articles.vue';
import AnArticle from './Article.vue';
import { getAllProperties } from '../../requests.js';

export default {
  name: 'SuperAdmin',

  components: {
    Articles,
    AnArticle,
  },

  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectedPropertyId: '',
      properties: [],
      selectedArticleId: '',
    };
  },

  async created() {
    this.properties = await getAllProperties();
    this.properties = this.properties[0];
  },
};
</script>

<style lang="scss" scoped>

</style>
