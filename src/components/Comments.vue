<template>
  <div class="comments">
    <comment
      v-for="comment in comments"
      :key="comment.text"
      :comment="comment"
      @vote="$emit('vote', {uid: comment.uid, type: $event})"
    />
  </div>
</template>

<script>
import Comment from './Comment.vue';

export default {
  name: 'Comments',
  components: {
    Comment,
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>
