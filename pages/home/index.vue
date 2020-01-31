<template>
  <div>
    <div class="home-wrapper">
      <h2 class="subtitle">
        Welcome to the NHM tree ID guide!
      </h2>

      <p>
        Placeholder for a high level description of the ID guide, how it works and what to expect...
      </p>

      <img src="@/assets/img/tree.jpg">

      <button
        @click="resetState"
        class="button"
      >
        <nuxt-link to="/guide">
          Start the guide
        </nuxt-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },

  methods: {
    resetState () {
      this.$store.dispatch('resetState')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  padding: 5%;

  h2 {
    text-align: center;
    margin: 1rem 0;
  }
}

img {
  width: 100%;
}
</style>
