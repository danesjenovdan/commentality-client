<template>
  <div>
    <input
      v-model="text"
      type="text"
      :placeholder="$t('send-comment')"
    >
    <button @click="sendComment">
      {{ $t('send-comment') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CommentInput',
  data() {
    return {
      text: '',
    };
  },
  methods: {
    sendComment() {
      this.$emit('sendComment', this.text);
    },
  },
};
</script>

<style>

</style>
