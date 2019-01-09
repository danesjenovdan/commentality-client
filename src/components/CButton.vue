<template>
  <button class="button">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  $height: 52px;
  border: 2px solid $primary-color;
  border-radius: $height / 2;
  background: transparent;
  color: $text-color;
  font-family: $font-family;
  font-weight: 700;
  font-size: 0.8rem;
  height: $height;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: $bg-hover-color;
  }
}
</style>
