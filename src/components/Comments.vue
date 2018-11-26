<template>
  <div>
    <button @click="fetchComments">Fetch comments</button>
    <input v-model="commentText" @keydown.enter="sendComment" />
    <div v-for="comment in comments">
      <i>{{ comment.owner }} je napisal:</i>
      {{ comment.contents }}
      <hr>
    </div>
  </div>
</template>

<script>
import { getComments, postComment } from '../requests';

export default {
  name: 'Comments',
  data() {
    return {
      comments: [],
      commentText: '',
    };
  },
  methods: {
    async fetchComments() {
      try {
        this.comments = await getComments();
      } catch (error) {
        console.log(error);
      }
    },
    async sendComment() {
      try {
        await postComment(this.commentText);
        this.commentText = '';
        this.fetchComments();
      } catch (error) {
        console.log(error);
      }
    },

  },
};
</script>
