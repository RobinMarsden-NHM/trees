<template>
  <div class="layout">
    <noscript>Javscript must be enabled to use this application.</noscript>
    <div class="container">
      <Header />
      <Main>
        <nuxt />
      </Main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Main from '~/components/Main'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Main,
    Footer
  }
}
</script>

<style>

</style>
