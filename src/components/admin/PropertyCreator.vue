<template>
  <div id="property-creator">
    <div
      v-if="!propertyCreatorVisible"
      class="col-md-12"
    >
      <button
        class="btn btn-primary"
        @click="propertyCreatorVisible = true"
      >
        Add new property
      </button>
    </div>
    <div class="col-12" v-else>
      <div class="form-group row">
        <label
          for="inputmailh"
          class="col-3 col-form-label"
        >
          Name of the property
        </label>
        <div class="col-6">
          <input
            v-model="propertyName"
            type="text"
            class="form-control"
          >
        </div>
        <div class="col-3">
          <button
            class="btn btn-primary"
            @click="createProperty"
          >
            Create property
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createProperty } from '../../requests';

  export default {
    name: 'PropertyCreator',
    props: {},
    data() {
      return {
        propertyName: '',
        propertyCreatorVisible: false,
      };
    },
    methods: {
      async createProperty() {
        await createProperty(this.propertyName);
        this.propertyCreatorVisible = false;
        this.$emit('propertyCreated');
      },
    },
  };
</script>

<style lang="scss" src="@/scss/base.scss" />
