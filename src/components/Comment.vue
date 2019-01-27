<template>
  <div class="comment">
    <p
      class="text"
      v-text="comment.text"
    />
    <div class="options">
      <div
        v-for="action in actions"
        :key="action"
        :class="['option', action, (comment.voted ? 'chart' : 'button')]"
        :style="getOptionStyle(action)"
        @click="$emit('vote', action)"
      >
        <i class="icon" />
        {{ $t(`choices.${action}`) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  components: {
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.actions = ['like', 'meh', 'dislike'];
  },
  methods: {
    getOptionStyle(action) {
      return this.comment.voted ? { flex: this.comment.votes[action] } : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  margin: 1rem;
  padding: 0 2rem 1.75rem 2rem;
  background-color: $bg-accent-color;
  border-radius: 12px;
  position: relative;

  @media (max-width: 575.98px) {
    margin: 0.75rem 0;
    padding: 1rem;
  }

  &::before {
    content: '“';
    display: block;
    position: absolute;
    top: 0.75rem;
    left: -1.25rem;
    font-size: 6rem;
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
    margin: 0;
    padding: 1.75rem;
    font-size: 1.65rem;
    font-weight: 200;

    @media (max-width: 575.98px) {
      padding: 0 0 1rem 0;
      font-size: 1.25rem;
    }
  }

  .options {
    display: flex;
    height: 52px;
    align-items: center;
    padding: 0 1.75rem;

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
      transition: all ease .5s;

      &:hover { background-color: $bg-hover-color; }

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
        $height: 42px;

        border-radius: $height / 2;
        border-style: solid;
        border-width: 3px;
        color: $text-color;
        flex: 1;
        font-family: $font-family;
        font-size: 12px;
        font-weight: bold;
        height: $height;

        &:not(:last-child) { margin-right: 0.667rem; }
        &:focus { outline: none; }

        .icon {
          display: block;
          width: 24px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 16px;
          background-repeat: no-repeat;
          background-position: center;
        }


        &.like {
          $color: map-get($criteria-colors, "like");
          border-color: $color;
          .icon { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23000"><path fill-rule="evenodd" clip-rule="evenodd" d="M98.58 45.806c.595-6.734-5.683-8.699-8.174-8.699-9.656-.002-19.315.001-28.972-.008 1.39-3.025 3.085-11.046.95-22.097-.843-4.369-3.421-7.275-6.705-7.217-2.646.046-5.173 2.086-5.438 4.63-.29 2.797-.977 6.78-1.627 9.504-2.128 8.911-13.738 20.762-20.734 24.504V45a3 3 0 0 0-3-3H4.38a3 3 0 0 0-3 3v43.667a3 3 0 0 0 3 3h20.5a3 3 0 0 0 3-3v-.261c4.907 2.917 10.252 3.912 15.969 3.803 8.732-.167 33.675-.021 38.195-.051 3.199-.021 6.389-1.547 7.923-5.409 2.096-5.271-3.307-7.908-3.307-7.908s5.915.292 7.267-5.014c1.387-5.446-4.055-7.601-4.055-7.601 3.68-.402 6.036-1.36 6.927-4.677 1.047-3.907-1.466-6.841-5.444-8.539.603-.059 6.679-1.04 7.225-7.204z"/></svg>');}
        }
        &.meh {
          $color: map-get($criteria-colors, "meh");
          border-color: $color;
          .icon { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23000"><path d="M91.3 24.4c-3.7-1.2-7.6.7-8.8 4.4-.2.6-3.2 9.7-5.6 17.1-4-4.6-7-7.9-11.4-7.9h-.8c-4 3.4-9.1 5.5-14.8 5.5S39.1 41.4 35.2 38h-.8C30 38 27 41.3 23 45.9c-2.4-7.3-5.4-16.5-5.6-17.1-1.2-3.7-5.1-5.6-8.8-4.4C5 25.6 3 29.5 4.2 33.2c.1.2 6.9 20.8 8.1 24.9.9 3.3 3.2 5.5 6.3 6.1 5.4 1.2 9.3-2.8 13.7-7.8l-1.1 36.2c-.1 2.7 2.1 4.9 4.8 4.9h28c2.7 0 4.9-2.2 4.8-4.9l-1.1-36.2c3.8 4.4 7.3 8 11.8 8 .6 0 1.2-.1 1.8-.2 3-.6 5.3-2.9 6.3-6.1 1.2-4.1 8-24.7 8.1-24.9 1.2-3.7-.7-7.6-4.4-8.8z"/><circle cx="50" cy="20.6" r="18.1"/></svg>');}
        }
        &.dislike {
          $color: map-get($criteria-colors, "dislike");
          border-color: $color;
          .icon { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23000"><path d="M91.4 47c4-1.7 6.5-4.6 5.4-8.5-.9-3.3-3.2-4.3-6.9-4.7 0 0 5.4-2.2 4.1-7.6-1.4-5.3-7.3-5-7.3-5s5.4-2.6 3.3-7.9c-1.5-3.9-4.7-5.4-7.9-5.4-4.5 0-29.5.1-38.2-.1-5.7-.1-11.1.9-16 3.8v-.3c0-1.7-1.3-3-3-3H4.4c-1.7 0-3 1.3-3 3V55c0 1.7 1.3 3 3 3h20.5c1.7 0 3-1.3 3-3v-1.4c7 3.7 18.6 15.6 20.7 24.5.6 2.7 1.3 6.7 1.6 9.5.3 2.5 2.8 4.6 5.4 4.6 3.3.1 5.9-2.8 6.7-7.2 2.1-11.1.4-19.1-1-22.1h29c2.5 0 8.8-2 8.2-8.7C98 48 92 47.1 91.4 47z"/></svg>');}
        }

        @media (max-width: 767.98px) { margin-bottom: 0.27rem; }
      }
    }


  }
}


</style>
