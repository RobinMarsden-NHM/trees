<template>
  <div class="inline-button-wrapper">
    <div class="inline-label-wrapper">
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/buttons.scss';

</style>
