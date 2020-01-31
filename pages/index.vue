<template>
  <nuxt-link to="/home">
    <div class="splash" />
    <div class="overlay">
      <img src="@/assets/img/icon-sm.png" alt="">
      <h1>Tree ID guide</h1>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  layout: 'splash'
}
</script>

<style lang="scss">
.splash {
  width: 100%;
  height: 100%;
  background: url('~assets/img/splash.jpg') center center no-repeat;
  background-size: cover;
  position: relative;
}

.overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  font-size: 0;

  img {
    padding: 2rem;
  }

  h1 {
    color: $color-darkgreen;
    margin-top: 0;
    margin-bottom: 2rem;
    display: block;
    text-align: center;
    font-size: 1.5rem;
  }
}
</style>
