import getMatches from './get-matches'
import { entrypointQuestionId } from '~/assets/data/data'

export default (remainingQuestions, answeredQuestions, candidates) => {
  //  Iterate remainingQuestions, assign each one a score and return array ordered with 'best' questions (ie lower scores) first
  //  *** WORK IN PROGRESS! THIS ALGORITHM IS KEY TO A GOOD USER EXPERIENCE ***

  remainingQuestions.map((question) => {
    question.score = 0
    question.matchedCandidates = []

    //  Add matching candidates to each filter and concat to matchedCandidates
    question.filters.map((filter) => {
      filter.matches = getMatches(candidates, filter)
      filter.count = 0
      question.matchedCandidates = question.matchedCandidates.concat(filter.matches)
    })

    //  Check for any unmatched candidates (there shouldn't be - this can be removed in due course)
    candidates.map((candidate) => {
      if (!question.matchedCandidates.includes(candidate)) {
        //  Should never be hit
        throw new Error(`Unmatched candidate(s)!`)
      }
    })

    //  Calculate match count per filter, adjusted for multiple matches
    //  (ie where a candidate is matched by more than one filter, split its 'count' equally between them)
    question.filters.map((filter) => {
      filter.matches.map((candidate) => {
        let count = 0
        question.matchedCandidates.map((matchedCandidate) => {
          if (matchedCandidate === candidate) {
            count += 1
          }
        })
        if (count) {
          filter.count += 1 / count
        } else {
          //  Should never be hit
          throw new Error(`Unmatched candidate(s)!`)
        }
      })
    })
    //  Calclate total score for each projection
    question.filters.map((filter) => {
      question.score += (filter.count ** 2)
    })
    question.score += (question.filters.length * candidates.length)
  })

  if (remainingQuestions.length) {
    remainingQuestions.sort((a, b) => a.score - b.score)
    //  If entrypoint question is present, put it at index 0 regardless of score
    const entrypointQuestion = remainingQuestions.find((question) => {
      return question.id === entrypointQuestionId
    })
    if (entrypointQuestion) {
      remainingQuestions = remainingQuestions.filter(question => question.id !== entrypointQuestionId)
      remainingQuestions.unshift(entrypointQuestion)
    }
    /* eslint-disable */
    // console.log(remainingQuestions.map(question => {
    //   return { id: question.id, score: question.score }
    // }))
    // console.log(remainingQuestions)
    /* eslint-enable */
    return remainingQuestions
  } else {
    return []
  }
}
