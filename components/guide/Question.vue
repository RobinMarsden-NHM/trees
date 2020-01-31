<template>
  <div
    v-if="currentQuestion"
    class="filter-set-wrapper"
  >
    <div class="filter-set-header">
      <h2 class="margin-top">
        {{ currentQuestion.description }}
      </h2>
    </div>

    <div class="filter-button-container">
      <FilterButton
        v-for="(filter) in currentQuestion.filters"
        v-if="filter.matches.length"
        @applyFilter="resetQuestionIndex"
        :key="filter.id"
        :filter="filter"
        :question="currentQuestion"
        :debugLabel="`${((filter.matches.length / remainingCandidates.length) * 100).toFixed(1).toString()}%`"
      />
    </div>

    <div class="question-nav-button-container">
      <button
        :disabled="!moreInfoComponent"
        :class="{ 'disabled': !moreInfoComponent }"
        @click="toggleMoreInfo"
        class="main-button"
      >
        <FaButton
          :fontAwesome="{ size: '2x', icon: 'question-circle' }"
          label="More info"
        />
      </button>
      <button
        :disabled="prevButtonDisabled"
        :class="{ 'disabled': prevButtonDisabled }"
        @click="prevQuestion"
        class="main-button"
      >
        <FaButton
          :fontAwesome="{ size: '2x', icon: 'chevron-circle-left' }"
          label="Previous question"
        />
      </button>
      <button
        :disabled="nextButtonDisabled"
        :class="{ 'disabled': nextButtonDisabled }"
        @click="nextQuestion"
        class="main-button"
      >
        <FaButton
          :fontAwesome="{ size: '2x', icon: 'chevron-circle-right' }"
          label="Next question"
        />
      </button>
    </div>

    <transition name="fade">
      <!-- eslint-disable-next-line -->
      <component
        :is="moreInfoComponent"
        v-if="moreInfoComponent && showMoreInfo"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterButton from '~/components/buttons/FilterButton'
import FaButton from '~/components/buttons/FaButton'
import moreInfoComponents from '~/assets/data/more-info-components'

export default {
  components: {
    FilterButton,
    FaButton
  },

  data () {
    return {
      showMoreInfo: false,
      currentQuestionIndex: 0
    }
  },

  computed: {
    ...mapGetters([
      'remainingCandidates',
      'remainingQuestions'
    ]),

    currentQuestion () {
      if (typeof this.currentQuestionIndex === 'number') {
        return this.remainingQuestions[this.currentQuestionIndex]
      } else {
        return null
      }
    },

    prevButtonDisabled () {
      return this.remainingQuestions.length < 2 || this.currentQuestionIndex < 1
    },

    nextButtonDisabled () {
      return this.remainingQuestions.length < 2 || this.currentQuestionIndex >= this.remainingQuestions.length - 1
    },

    moreInfoComponent () {
      try {
        return moreInfoComponents.find(component => component.id === this.currentQuestion.id).component
      } catch (err) {
        return null
      }
    }
  },

  methods: {
    resetState () {
      this.$store.dispatch('resetState')
      this.currentQuestionIndex = 0
      this.showMoreInfo = false
    },

    toggleMoreInfo () {
      this.showMoreInfo = !this.showMoreInfo
    },

    prevQuestion () {
      this.currentQuestionIndex--
      this.showMoreInfo = false
    },

    nextQuestion () {
      this.currentQuestionIndex++
      this.showMoreInfo = false
    },

    resetQuestionIndex () {
      this.currentQuestionIndex = 0
    }
  }
}
</script>

<style lang="scss">
h2 {
  margin: 0 1rem;
  width: 100%;
  text-align: left;
}

button {
  background: none;
  border: none;
  font-size: inherit;
}

.filter-set-header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  & > * {
    display: inline-block;
  }
}

.filter-button-container {
  justify-content: flex-start;
}

.question-nav-button-container {
  text-align: left;
  padding: 0 0.5rem;
}
</style>
