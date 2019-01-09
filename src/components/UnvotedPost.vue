<template>
  <div class="post">
    <p
      class="text"
      v-text="text"
    />
    <div class="buttons">
      <c-button
        text="Se strinjam"
        icon="thumbs-up"
        @click.native="$emit('vote', 'yes')"
      />
      <c-button
        text="Ne znam se opredeliti"
        icon="hand-paper"
        @click.native="$emit('vote', 'meh')"
      />
      <c-button
        text="Se ne strinjam"
        icon="thumbs-down"
        @click.native="$emit('vote', 'no')"
      />
    </div>
  </div>
</template>

<script>
import CButton from './CButton.vue';

export default {
  name: 'Post',
  components: {
    CButton,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin: 1rem 3rem;
  padding: 0 2rem 3rem 2rem;
  text-align: center;
  background-color: $bg-accent-color;
  border-radius: 12px;
  position: relative;

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
  }

  &::after {
    left: initial;
    top: initial;
    bottom: 1.5rem;
    right: -3.2rem;
    transform-origin: center;
    transform: rotate(180deg);
  }

  .text {
    margin: 0;
    padding: 3rem;
    font-size: 1.65rem;
    font-weight: 200;
  }

  .buttons {
    display: flex;

    .button {
      flex: 1;
      margin: 0 6px;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
