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
          <articles
            :property-id="propertyId"
          />
        </div>
        <div
          v-if="authenticated"
          class="row"
        >
          <an-article
            :article-id="articleId"
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

export default {
  name: 'Admin',
  components: {
    Login,
    Articles,
    AnArticle,
  },
  data() {
    return {
      propertyId: 'bba4266cf6264de1ae5a85217e3e0935', // TODO stop hardcoding property
      articleId: '4af5aabde5044d88b4a905cadb576bc7', // TODO stop hardcoding articleId
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
        this.setPropertyId();
      }
    },
  },
  methods: {
    ...mapActions([
      'startVerification',
      'refreshJwtToken',
    ]),
    setPropertyId() {
      // placeholder function to dynamically set property id after login
      return false;
    },
  },
  async created() {
    this.startVerification();
    await this.refreshJwtToken();
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />
