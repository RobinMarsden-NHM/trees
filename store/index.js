import * as data from '~/assets/data/data'
import helpers from '~/helpers/filters'

export const state = () => ({
  //  Candidates
  allCandidates: data.getCandidates(),
  remainingCandidates: data.getCandidates(),
  resultIndex: null,
  //  Questions
  allQuestions: data.getQuestions(),
  remainingQuestions: helpers.rankQuestions(
    data.getQuestions(),
    [],
    data.getCandidates()
  ),
  answeredQuestions: [],
  //  Filters
  activeFilters: []
})

export const getters = {
  allCandidates (state) {
    return state.allCandidates
  },

  remainingCandidates (state) {
    return state.remainingCandidates
  },

  activeFilters (state) {
    return state.activeFilters
  },

  remainingQuestions (state) {
    return state.remainingQuestions
  },

  result (state) {
    return state.allCandidates[state.resultIndex]
  }
}

export const actions = {
  resetState (context) {
    context.commit('resetState')
  },

  activateFilter (context, filter) {
    context.commit('activateFilter', filter)
    context.commit('updateRemainingCandidates')
    context.commit('updateRemainingQuestions')
  },

  deactivateFilter (context, filter) {
    context.commit('deactivateFilter', filter)
    context.commit('updateRemainingCandidates')
    context.commit('updateRemainingQuestions')
  },

  setResult (context, id) {
    context.commit('setResult', id)
  }
}

export const mutations = {
  resetState (state) {
    //  Candidates
    state.remainingCandidates = [...state.allCandidates]
    state.resultIndex = null
    //  Filter sets
    state.remainingQuestions = helpers.rankQuestions(
      [...state.allQuestions],
      [...state.answeredQuestions],
      [...state.allCandidates]
    )
    state.answeredQuestions = []
    //  Filters
    state.activeFilters = []
  },

  activateFilter (state, filter) {
    //  Add filter to activeFilters
    state.activeFilters.push(filter)
    //  Add question to answeredQuestions
    state.answeredQuestions.push(filter.question)
    //  Remove question from remainingQuestions
    state.remainingQuestions = state.remainingQuestions.filter((remainingQuestion) => {
      return remainingQuestion.id !== filter.question.id
    })
  },

  deactivateFilter (state, filter) {
    //  Remove filter from activeFilters
    state.activeFilters = state.activeFilters.filter((activeFilter) => {
      return activeFilter.id !== filter.id
    })
    //  Remove question from answeredQuestions
    state.answeredQuestions = state.answeredQuestions.filter((answeredQuestion) => {
      return answeredQuestion.id !== filter.question.id
    })
    //  Add filter set to remainingQuestions
    state.remainingQuestions.push(filter.question)
  },

  //  Applies all active filters to create array of remaining candidates
  updateRemainingCandidates (state) {
    state.remainingCandidates = [...state.allCandidates]
    state.activeFilters.map((filter) => {
      state.remainingCandidates = helpers.getMatches(state.remainingCandidates, filter)
    })
  },

  //  Removes all active and invalid filter sets
  updateRemainingQuestions (state) {
    state.remainingQuestions = [...state.allQuestions]
    //  Remove any active questions
    state.answeredQuestions.forEach((activeQuestion) => {
      state.remainingQuestions = state.remainingQuestions.filter((question) => {
        return activeQuestion.id !== question.id
      })
    })
    //  Remove any redundant questions
    //  (ie those that do not return at least 2 filters with different candidate sets)
    state.remainingQuestions.forEach((question) => {
      const validResultSets = []
      //  Project the results for each filter in the question
      question.filters.forEach((filter) => {
        const matches = helpers.getMatches(state.remainingCandidates, filter)
        //  If filter both returns and rejects at least one candidate, it is valid
        if (matches.length && matches.length < state.remainingCandidates.length) {
          validResultSets.push(matches)
        }
      })
      //  Remove duplicate result sets
      // *** must improve - JSON.stringify is inefficient for this *** //
      const uniqueResultSets = []
      validResultSets.forEach((resultSet) => {
        if (!uniqueResultSets.includes(JSON.stringify(resultSet))) {
          uniqueResultSets.push(JSON.stringify(resultSet))
        }
      })
      //  If there are less than 2 unique filters in the set, remove it from remainingQuestions
      if (uniqueResultSets.length < 2) {
        state.remainingQuestions = state.remainingQuestions.filter((remainingQuestion) => {
          return remainingQuestion.id !== question.id
        })
      }
    })
    state.remainingQuestions = Object.assign([], helpers.rankQuestions(
      state.remainingQuestions,
      state.answeredQuestions,
      state.remainingCandidates
    ))
  },

  setResult (state, id) {
    state.resultIndex = state.allCandidates.findIndex((candidate) => {
      return candidate.id === id
    })
  }
}
