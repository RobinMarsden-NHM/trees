<template>
  <div class="button-wrapper">
    <div class="img-wrapper">
      <img
        v-if="imgSrc"
        :src="imgSrc"
        :alt="label"
      >
    </div>

    <div class="label-wrapper">
      <span>
        {{ label }}
      </span>
      <span
        v-if="debugLabel"
        class="debug-label"
      >
        {{ debugLabel }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: () => ''
    },

    label: {
      type: String,
      default: () => ''
    },

    debugLabel: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/buttons.scss';

.debug-label {
  position: absolute;
  bottom: -1.5rem;
  right: 0.2rem;
  font-style: italic;
  color: $color-lightgrey;
}
</style>
