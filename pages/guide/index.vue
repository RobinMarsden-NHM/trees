<template>
  <div class="guide-wrapper">
    <div class="bottom">
      <ActiveFilters />
      <Question />
      <Candidates />
    </div>
  </div>
</template>

<script>
import ActiveFilters from '@/components/guide/ActiveFilters'
import Question from '@/components/guide/Question'
import Candidates from '@/components/guide/Candidates'

export default {
  components: {
    ActiveFilters,
    Question,
    Candidates
  }
}
</script>

<style lang="scss" scoped>
.guide-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.top {
  flex: 1 1 0%;
}

.bottom {
  flex: 1 1 100%;
  min-height: 50%;
  overflow-y: auto;
}
</style>
