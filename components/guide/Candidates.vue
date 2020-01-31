<template>
  <div>
    <div
      ref="masonry-container"
      v-images-loaded="layoutMasonry"
      class="masonry-container"
    >
      <div class="gutter-sizer" />

      <div
        v-for="(candidate) in remainingCandidates"
        :key="candidate.id"
        :ref="candidate.id"
        class="masonry-item hidden"
      >
        <Candidate
          :candidate="candidate"
        />
      </div>

      <div
        :ref="[otherCandidate.id]"
        class="masonry-item hidden"
      >
        <Candidate
          :candidate="otherCandidate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Packery from 'packery'
import imagesLoaded from 'vue-images-loaded'
import Vue from 'vue'

import Candidate from './Candidate'
import otherCandidate from '@/assets/data/other-candidate'

export default {
  components: {
    Candidate
  },

  directives: {
    imagesLoaded
  },

  data () {
    return {
      packery: null,
      otherCandidate
    }
  },

  computed: {
    ...mapGetters([
      'allCandidates',
      'remainingCandidates'
    ])
  },

  updated () {
    this.layoutMasonry()
  },

  methods: {
    layoutMasonry () {
      this.hideMasonry()
      this.packery = new Packery(this.$refs['masonry-container'], {
        itemSelector: '.masonry-item',
        gutter: '.gutter-sizer',
        transitionDuration: 0,
        percentPosition: true
      })
      this.revealMasonry()
    },

    hideMasonry () {
      //  Hide all masonry items currently present in DOM
      const items = this.getMasonryItems()
      items.map(item => item.classList.add('hidden'))
    },

    revealMasonry () {
      //  Staggered reveal all masonry items currently present in DOM
      Vue.nextTick(() => {
        const items = this.getMasonryItems()
        let interval = 125
        for (let i = 0; i < items.length; i++) {
          setTimeout(() => {
            items[i].classList.remove('hidden')
          }, i * interval)
          interval *= 0.98
        }
      })
    },

    getMasonryItems () {
      //  Return all masonry items currently present in DOM
      const refs = Object.values(this.$refs)
      const items = []
      refs.map((item) => {
        if (item[0] && item[0].classList.contains('masonry-item')) {
          items.push(item[0])
        } else if (item.classList && item.classList.contains('masonry-item')) {
          items.push(item)
        }
      })
      return items
    }
  }
}
</script>

<style lang="scss" scoped>
.masonry-container {
  padding: 2%;
}

.masonry-item {
  transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  width: 47%;
}

@media only screen and (max-width: $breakpoint-sm) {
  .masonry-item {
    width: 96%;
  }
}

.gutter-sizer {
  width: 2%;
}

.hidden {
  opacity: 0;
  transform: translateY(0.5rem);
  transition: none;
}
</style>
