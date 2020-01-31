<template>
  <button
    :filter="filter"
    @click="deactivateFilter"
    class="main-button"
  >
    <TextButton
      :label="filter.filter_label"
    />
  </button>
</template>

<script>
import TextButton from './TextButton'

export default {
  components: {
    TextButton
  },

  props: {
    filter: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    deactivateFilter () {
      this.$store.dispatch('deactivateFilter', this.filter)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
