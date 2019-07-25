<template xmlns="http://www.w3.org/1999/html">
  <div class="comment-input">
    <img src="../assets/speech-bubble.png" alt="" class="bubble">
    <div class="statement" v-if="!finishedCommenting">
      <h3>{{ $t('add-statement') }}</h3>
      <p class="text">
        {{ $t('statement-disclaimer') }}
      </p>
    </div>
    <div class="input" v-if="!finishedCommenting">
      <textarea
        v-model="text"
        rows="3"
        type="text"
        :placeholder="finishedVoting ? $t('comment-input-placeholder') : $t('statement-requirements')"
        :disabled="!finishedVoting || sendingComment"
      ></textarea>
      <button
        :disabled="text.length == 0 || sendingComment"
        @click="sendComment"
      >
        {{ $t('send-comment') }}
      </button>
    </div>

    <div class="thank-you" v-if="finishedCommenting">
      <p class="text"><b>{{ $t('thank-you') }}</b></p>
      <p class="text">{{ $t('thank-you-content') }}</p>
    </div>
  </div>
</template>

<script>
import {
  createComment,
} from '../requests';

export default {
  name: 'CommentInput',
  props: {
    articleId: {
      type: String,
      required: true,
    },
    finishedVoting: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      text: '',
      finishedCommenting: false,
      sendingComment: false,
    };
  },
  methods: {
    async sendComment() {
      this.sendingComment = true;
      createComment(this.articleId, this.text);
      this.sendingComment = false;
      this.finishedCommenting = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .comment-input {
    display: flex;
    margin: 0.8rem 0;
    padding: 3.25rem 2.825rem 1.65rem 2.825rem;
    background-color: $bg-accent-color;
    border-radius: 0.5rem;
    position: relative;
    flex-wrap: wrap;
    flex-direction: row;

    @media (max-width: 823px) {
      flex-direction: column;
    }

    @media (max-width: 575.98px) {
      margin: 0.75rem 0;
      padding: 1rem;
    }

    .bubble {
      position: absolute;
      left: -0.5rem;
      top: 1.25rem;
      width: 40px;

      @media (max-width: 575.98px) {
        left: -1.5rem;
      }
    }

    .text {
      margin: 0 0 0.75rem;
      font-size: 1rem;
      font-weight: 200;
      letter-spacing: 0.02em;
      line-height: 1.35rem;

      @media (max-width: 575.98px) {
        padding: 0 0 1rem 0;
        font-size: 1rem;
      }
    }

    .statement {
      flex: 1;
    }

    .input {
      flex: 1;
      text-align: right;
    }

    .thank-you {
      font-style: italic;
      width: 100%;
      text-align: center;
      margin-bottom: 1rem;

      p {
        margin: 0;
      }
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 200;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-style: italic;
    }

    p {
      margin-top: 0.5rem;
      font-weight: 200;
      color: #555;
    }

    button {
      border-radius: 42px;
      border: 4px solid #78dfac;
      padding: 0.75rem 1rem;
      background: transparent;
      text-transform: uppercase;
      font-weight: bold;
      font-family: $font-family;
    }

    button[disabled],
    textarea[disabled] {
      border-color:  #d7d7d7;;
      color: #d7d7d7;;
    }

    textarea {
      width: 100%;
      padding: 1rem;
      resize: none;
      margin-bottom: 0.75rem;
      font-family: $font-family;
      border-radius: 20px;
      border: 2px solid #000000;
      font-size: 1rem;
      font-weight: 200;
    }
  }

</style>
