<template>
  <footer class="footer">
    <nuxt-link :to="getWrapperAppUrl">
      <font-awesome-icon
        size="2x"
        icon="list-ul"
        class="footer-button"
      />
    </nuxt-link>

    <nuxt-link to="/home">
      <font-awesome-icon
        size="2x"
        icon="home"
        class="footer-button"
      />
    </nuxt-link>

    <nuxt-link to="/about">
      <font-awesome-icon
        size="2x"
        icon="info-circle"
        class="footer-button"
      />
    </nuxt-link>
  </footer>
</template>

<script>
export default {
  computed: {
    getWrapperAppUrl: () => {
      //  Placeholder functionality - need to handle this properly
      return '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
@supports (display:-ms-grid) {
  .footer {
    justify-content: space-around;
  }
}

.footer-button {
  padding: 1rem;
  border: none;
  background: none;
  color: $color-darkgreen;

  &:active:not(.disabled) {
    transform: scale(0.9);
  }

  &:active,
  &:focus {
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
  }
}
</style>
