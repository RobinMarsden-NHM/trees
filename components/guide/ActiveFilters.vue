<template>
  <div class="active-filter-wrapper">
    <h3>
      Active filters ({{ remainingCandidates.length }} candidates remaining)
    </h3>

    <div class="filter-button-container">
      <ActiveFilter
        v-for="(filter) in activeFilters"
        :key="filter.id"
        :filter="filter"
      />

      <button
        @click="resetState"
        :disabled="!activeFilters.length"
        :class="{ disabled: !activeFilters.length }"
        class="main-button"
      >
        <FaButton
          :fontAwesome="{ size: '2x', icon: 'times' }"
          :class="{ 'disabled': !activeFilters.length }"
          label="Clear filters"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActiveFilter from '~/components/buttons/ActiveFilter'
import FaButton from '~/components/buttons/FaButton'

export default {
  components: {
    ActiveFilter,
    FaButton
  },

  computed: {
    ...mapGetters([
      'activeFilters',
      'remainingCandidates'
    ]),

    svgCross: () => {
      return require('@/assets/img/svg/cross.svg')
    }
  },

  methods: {
    resetState () {
      this.$store.dispatch('resetState')
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: left;
  margin: 0.5rem 1rem;
}

.active-filter-wrapper {
  padding-top: 1rem;
  margin-bottom: 1rem;
}

.filter-button-container {
  justify-content: flex-start;
  flex-direction: row;
  align-items: stretch;
  padding: 0 0.75rem;

  button {
    margin: 0 0.25rem;
  }
}
</style>
