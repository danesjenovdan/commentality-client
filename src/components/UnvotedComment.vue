<template>
  <div class="comment">
    <login
      v-if="authStep"
      :authStep="authStep"
      @codeRequested="authStep = 'verify'"
      @authenticated="$emit('vote', tmpVote)"
    />
    <div v-if="!authStep">
      <p
        class="text"
        v-text="comment.text"
      />
      <div class="buttons">
        <c-button
          :text="$t('choices.like')"
          icon="like"
          @click.native="tryToVote('like')"
        />
        <c-button
          :text="$t('choices.meh')"
          icon="meh"
          @click.native="tryToVote('meh')"
        />
        <c-button
          :text="$t('choices.dislike')"
          icon="dislike"
          @click.native="tryToVote('dislike')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from './Login.vue';
import CButton from './CButton.vue';

export default {
  name: 'UnvotedComment',
  components: {
    CButton,
    Login,
  },
  data() {
    return {
      authStep: null,
      tmpVote: null,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['userId', 'authenticated']),
  },
  methods: {
    tryToVote(vote) {
      if (this.authenticated) {
        this.$emit('vote', vote);
      } else {
        this.authStep = 'begin';
        this.tmpVote = vote;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  margin: 1rem 3rem;
  padding: 0 2rem 3rem 2rem;
  text-align: center;
  background-color: $bg-accent-color;
  border-radius: 12px;
  position: relative;

  @media (max-width: 575.98px) {
    margin: 0.75rem 0;
    padding: 1rem;
  }

  &::before,
  &::after {
    content: '“';
    display: block;
    position: absolute;
    top: 1.5rem;
    left: -3.2rem;
    font-size: 8rem;
    font-weight: 800;
    line-height: 1;
    color: $secondary-color;

    @media (max-width: 575.98px) {
      font-size: 5rem;
      top: 0.5rem;
      left: -1.5rem;
    }
  }

  &::after {
    left: initial;
    top: initial;
    bottom: 1.5rem;
    right: -3.2rem;
    transform-origin: center;
    transform: rotate(180deg);

    @media (max-width: 575.98px) {
      bottom: 0.5rem;
      right: -1.5rem;
    }
  }

  .text {
    margin: 0;
    padding: 3rem;
    font-size: 1.65rem;
    font-weight: 200;

    @media (max-width: 575.98px) {
      padding: 0 0 1rem 0;
      font-size: 1.25rem;
    }
  }

  .buttons {
    display: flex;

    @media (max-width: 767.98px) {
      flex-direction: column;
    }

    .button {
      flex: 1;
      margin: 0 6px;

      @media (max-width: 767.98px) {
        margin-bottom: 5px;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
