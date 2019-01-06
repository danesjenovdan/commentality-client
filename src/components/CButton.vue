<template>
  <div class="button">
    {{ text }}
    <i :class="`fas fa-${icon}`" />
  </div>
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

<style>
.button {
  background: purple;
  color: white;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5em 1em;
  user-select: none;
}
</style>
