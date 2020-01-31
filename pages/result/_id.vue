<template>
  <div class="result-wrapper">
    <img
      :src="imgSrc"
      :alt="result.names.common"
    >
    <!-- eslint-disable-next-line -->
    <component
      :is="resultComponent"
      :result="result"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import resultComponents from '~/assets/data/result-components'

export default {
  computed: {
    ...mapGetters([
      'result'
    ]),

    resultId () {
      return this.$route.params.id
    },

    resultComponent () {
      return resultComponents.find(result => result.id === this.resultId).component
    },

    imgSrc () {
      try {
        return require(`@/assets/data/candidates/${this.result.id}/main.jpg`)
      } catch (err) {
        return require('@/assets/img/placeholder.jpg')
      }
    }
  },

  created () {
    this.$store.dispatch('setResult', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.result-wrapper {
  padding: 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: lightcyan;
  align-items: center;

  img {
    max-width: 100%;
  }
}
</style>
