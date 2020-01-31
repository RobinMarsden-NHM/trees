<template>
  <div class="inline-button-wrapper">
    <font-awesome-icon
      :size="fontAwesome.size"
      :icon="fontAwesome.icon"
    />
    <div class="inline-label-wrapper">
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fontAwesome: {
      type: Object,
      default: () => ({
        size: '2x',
        icon: 'question-circle'
      })
    },

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
