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
      <div class="row mt-3 mb-5">
        <property-creator
          @propertyCreated="refreshProperties"
        />
      </div>
      <div
          v-if="properties.length"
          class="row">
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
import PropertyCreator from './PropertyCreator.vue';
import { getMyProperties } from '../../requests.js';

export default {
  name: 'SuperAdmin',

  components: {
    Articles,
    AnArticle,
    PropertyCreator,
  },

  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    async refreshProperties() {
      this.properties = await getMyProperties();

      if (this.properties.length === 1) {
        this.selectedPropertyId = this.properties[0].uid;
      }
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
    this.refreshProperties();
  },
};
</script>

<style lang="scss" scoped>

</style>
