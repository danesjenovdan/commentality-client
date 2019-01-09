<template>
  <div class="voting">
    <transition
      v-for="post in posts"
      :key="post.text"
      name="slide-fade"
    >
      <unvoted-post
        v-if="!post.voted"
        :key="post.text"
        :post="post"
        @vote="$emit('vote', $event)"
      />
    </transition>
  </div>
</template>

<script>
import UnvotedPost from './UnvotedPost.vue';

export default {
  name: 'Voting',
  components: {
    UnvotedPost,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.25s ease-in-out,
    height 0.35s ease-in-out,
    padding 0.35s ease-in-out;
  height: 253px;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  height: 0;
  padding: 0;
}
</style>
