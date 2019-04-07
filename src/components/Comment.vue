<template>
  <div class="comment">
    <login v-if="showLogin" />
    <div v-else>
      <p
        class="text"
        v-text="contents"
      />
      <div class="options">
        <div :class="['options-container', {'results-container': voted}]">
          <div
            v-for="action in actions"
            :key="action"
            class="portion-label"
            :style="voted ? { flex: votes[action] } : null"
          >
            <strong v-if="voted">{{ getPercentage(action) }}</strong>
            <span
              v-if="voted"
              v-text="$t(`result-labels.${action}`)"
            />
          </div>
        </div>
        <div :class="['options-container', {'results-container': voted}]">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { sum, round } from 'lodash';

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
    allVotes() {
      return sum(Object.values(this.votes));
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
    getPercentage(action) {
      const value = round(this.votes[action] / this.allVotes * 100, 1);
      return `${value} %`;
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
  flex-wrap: wrap;

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
    .options-container {
      align-items: center;
      display: flex;

      @media (max-width: 823px) {
        flex-direction: column;

        &.results-container {
          flex-direction: row;
        }
      }
    }

    .option {
      cursor: pointer;
      text-transform: uppercase;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      line-height: 30px !important;
      padding-left: 35px;
      padding-right: 15px;
      flex-wrap: nowrap;

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
        height: 1.5rem;

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

        @media (max-width: 823px) { margin-bottom: 0.27rem; }
      }
    }

    .labels { display: flex; }

    .portion-label {
      flex-shrink: 1;
      flex-grow: 1;
      margin-right: 4px;
      display: flex;
      flex-direction: column;
      font-size: 0.5rem;
      font-style: italic;
      line-height: 1;
      margin: 0 0.25rem 0.5rem 0.25rem;
      text-align: center;

      strong { font-weight: 800; }
      span { font-weight: 200; }

      &:last-child { margin-right: 0; }
    }
  }
}


</style>
