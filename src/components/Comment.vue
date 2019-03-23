<template>
  <div class="comment">
    <login v-if="showLogin" />
    <div v-else>
      <p
        class="text"
        v-text="contents"
      />
      <div class="options">
        <div
          v-for="action in actions"
          :key="action"
          :class="['option', action, (voted ? 'chart' : 'button with-icon')]"
          :style="voted ? { flex: votes[action] } : null"
          @click="vote(action)"
        >
          {{ $t(`choices.${action}`) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Login from './Login.vue';

export default {
  name: 'Comment',
  components: {
    Login,
  },
  props: {
    contents: {
      type: String,
      required: true,
    },
    votes: {
      type: Object,
      required: true,
    },
    voterIds: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      triedVoting: false,
      temporaryVote: null,
      actions: Object.freeze(['like', 'meh', 'dislike']),
    };
  },
  computed: {
    ...mapGetters(['userId', 'authenticated']),
    showLogin() {
      return this.triedVoting && !this.authenticated;
    },
    voted() {
      return this.voterIds.indexOf(this.userId) > -1;
    },
  },
  watch: {
    authenticated(newValue) {
      if (this.temporaryVote && newValue === true) {
        this.vote(this.temporaryVote);
      }
    },
  },
  methods: {
    ...mapActions([
      'startVerification',
    ]),
    vote(vote) {
      this.triedVoting = true;

      if (this.authenticated) {
        this.$emit('vote', vote);
      } else {
        this.temporaryVote = vote;
        this.startVerification();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  margin: 0.8rem 0;
  padding: 1.25rem 2.825rem 1.65rem 2.825rem;
  background-color: $bg-accent-color;
  border-radius: 0.5rem;
  position: relative;

  @media (max-width: 575.98px) {
    margin: 0.75rem 0;
    padding: 1rem;
  }

  &::before {
    content: '“';
    display: block;
    position: absolute;
    top: 0.7rem;
    left: -0.5rem;
    font-size: 3.4rem;
    font-weight: 800;
    line-height: 1;
    color: $secondary-color;

    @media (max-width: 575.98px) {
      font-size: 5rem;
      top: 0.5rem;
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
      font-size: 1.25rem;
    }
  }

  .options {
    align-items: center;
    display: flex;
    height: 52px;

    @media (max-width: 767.98px) {
      flex-direction: column;
    }

    .option {
      cursor: pointer;
      text-transform: uppercase;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      &.chart {
        height: 12px;
        border-radius: 6px;
        font-size: 0;

        &:not(:last-child) { margin-right: 5px; }

        &.like { background: map-get($criteria-colors, "like"); }
        &.meh { background: map-get($criteria-colors, "meh"); }
        &.dislike { background: map-get($criteria-colors, "dislike"); }
      }

      &.button {
        flex: 1;

        &:not(:last-child) { margin-right: 0.475rem; }

        &:before {
          display: block;
          height: 100%;
          line-height: 1.4rem;
          font-size: 0.9rem;
          position: absolute;
          top: 0;
          left: 0.5rem;
        }

        &.like {
          border-color: map-get($criteria-colors, "like");;
          &:before { content: '👍' }
        }
        &.meh {
          border-color: map-get($criteria-colors, "meh");;
          &:before { content: '🤷' }
        }
        &.dislike {
          border-color: map-get($criteria-colors, "dislike");;
          &:before { content: '👎' }
        }

        @media (max-width: 767.98px) { margin-bottom: 0.27rem; }
      }
    }


  }
}


</style>
