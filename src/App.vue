<template>
  <div id="app">
    <login v-if="!authenticated" />
    <comments v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Comments from './components/Comments.vue';
import Login from './components/Login.vue';

export default {
  name: 'app',
  components: {
    Comments,
    Login,
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
};
</script>
