<template>
  <div>
    <h1>{{ result.names.common }}</h1>
    <p>Lots of interesting stuff about {{ result.names.common }} goes here</p>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
