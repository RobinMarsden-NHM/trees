<template>
  <div class="moreInfoWrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.moreInfoWrapper {
  margin: 1rem;
  text-align: left;

  p, li {
    line-height: 1.5;
  }

  li {
    margin-bottom: 0.5rem;
  }
}
</style>
