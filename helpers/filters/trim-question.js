import getMatches from './get-matches'

export default (question, candidates) => {
  if (question.id) {
    //  Add candidate sets to filters
    const trimmedQuestion = Object.assign({}, question)
    trimmedQuestion.filters.map((filter) => {
      filter.candidates = getMatches(candidates, filter)
    })
    //  Remove redundant filters (those that return no candidates)
    trimmedQuestion.filters = trimmedQuestion.filters.filter((filter) => {
      return filter.candidates.length
    })
    return trimmedQuestion
  } else {
    return {}
  }
}
