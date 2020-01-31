<template>
  <nuxt-link
    :to="resultPath"
  >
    <div class="candidate">
      <div class="textbox">
        <h3>{{ candidate.names.common }}</h3>
        <!-- <p>IID: "{{ candidate.id }}"</p> -->
        <p>
          <em>{{ candidate.names.scientific }}</em>
        </p>
      </div>
      <div class="image-wrapper">
        <img
          :src="imgSrc"
          :alt="candidate.names.common"
        >
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    candidate: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    imgSrc () {
      try {
        return require(`@/assets/data/candidates/${this.candidate.id}/main.jpg`)
      } catch (err) {
        return require('@/assets/img/placeholder.jpg')
      }
    },

    resultPath () {
      return `/result/${this.candidate.id}`
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}

.candidate {
  // margin: 3%;
  padding: 3%;
  box-sizing: border-box;
  border-radius: 1%;
  box-shadow: $box-shadow;
  background: $color-white;
  display: flex;
  justify-content: space-between;

  .image-wrapper {
    font-size: 0;
  }

  & > * {
    flex: 0 0 50%;
  }
}

.textbox {
  text-align: left;
  box-sizing: border-box;
  padding-right: 3%;

  h3 {
    margin-top: 0;
  }
}

img {
  width: 100%;
  max-width: 100%;
}
</style>
