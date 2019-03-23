<template>
  <div class="sort">
    {{ $t('sort.sort-by') }}:
    <span
      v-for="(criterion, criterionName) in sortCriteria"
      :key="criterion"
      :class="['sort-criterion', {'is-selected': criterion === value}]"
      @click.prevent="sortBy(criterion)"
    >
      {{ $t(`sort.${criterionName.toLowerCase()}`) }}
    </span>
  </div>
</template>

<script>
import { SortCriterion } from '../sort';

export default {
  name: 'Sort',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      sortCriteria: SortCriterion,
    };
  },
  methods: {
    sortBy(criterion) {
      this.$emit('input', criterion);
    },
  },
};
</script>

<style lang="scss" scoped>
.sort {
  font-size: 0.7rem;
  margin: 1.5rem 0 0.5rem 0;
}

.sort-criterion {
  text-transform: uppercase;
  font-style: italic;
  user-select: none;

  &:not(.is-selected) { cursor: pointer; }
  &:not(:last-child)::after {
    color: $text-color;
    content: ' / ';
    font-weight: 400;
  }
  &.is-selected {
    color: map-get($criteria-colors, "like");
    font-weight: 800;
    letter-spacing: 0.028rem;
  }
}
</style>
