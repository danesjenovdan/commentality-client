<template>
  <div class="post">
    <p>{{ text }}</p>
    <div class="buttons">
      <c-button
        text="Se strinjam"
        icon="thumbs-up"
        @click.native="$emit('vote', 'yes')"
      />
      <c-button
        text="Vseeno mi je"
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
  border: 2px solid #ccc;
  font-size: 1.25rem;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
