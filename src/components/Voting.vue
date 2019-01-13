<template>
  <div class="voting">
    <transition
      v-for="comment in comments"
      :key="comment.text"
      name="slide-fade"
    >
      <unvoted-comment
        v-if="!comment.voted"
        :key="comment.text"
        :comment="comment"
        @vote="$emit('vote', {uid: comment.uid, type: $event})"
      />
    </transition>
  </div>
</template>

<script>
import UnvotedComment from './UnvotedComment.vue';

export default {
  name: 'Voting',
  components: {
    UnvotedComment,
  },
  props: {
    comments: {
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
