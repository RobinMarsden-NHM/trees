<template>
  <button
    v-on:click="activateFilter(filter)"
    class="filter-button"
  >
    <SvgButton
      :imgSrc="imgSrc"
      :question="question"
      :label="filter.button_label"
      :debugLabel="debugLabel"
      :class="classes"
    />
  </button>
</template>

<script>
import SvgButton from './SvgButton'

export default {
  components: {
    SvgButton
  },

  props: {
    filter: {
      type: Object,
      default: () => {}
    },

    question: {
      type: Object,
      default: () => {}
    },

    debugLabel: {
      type: String,
      default: () => ''
    },

    icon: {
      type: String,
      default: () => ''
    }
  },

  computed: {
    imgSrc () {
      if (this.filter.icon) {
        try {
          return require(`~/assets/data/questions/${this.filter.icon}`)
        } catch (err) {
          return require(`~/assets/img/svg/question.svg`)
        }
      } else {
        try {
          return require(`~/assets/data/questions/${this.question.id}/${this.filter.id}.svg`)
        } catch (err) {
          return require(`~/assets/img/svg/question.svg`)
        }
      }
    },

    classes () {
      if (this.filter.icon) {
        return [ `q-${this.question.id}`, `f-${this.filter.id}` ]
      } else {
        return null
      }
    }
  },

  methods: {
    activateFilter (filter) {
      this.$emit('applyFilter')
      this.$store.dispatch('activateFilter', filter)
    },

    resetState () {
      this.$store.dispatch('resetState')
    }
  }
}
</script>

<style lang="scss">
//  Specific transforms to reuse same svg assets but with contextual modifiers
//  ...there's probably a much better way to do this...
.q-leaf-length-bracket {
  &.f-up-to-3cm .img-wrapper img {
    transform: scale(0.35);
  }

  &.f-3-to-6cm .img-wrapper img {
    transform: scale(0.55);
  }

  &.f-6-to-10cm .img-wrapper img {
    transform: scale(0.75);
  }
}
</style>
