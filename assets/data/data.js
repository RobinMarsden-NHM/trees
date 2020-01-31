import candidates from './candidates.json'
import questions from './questions.json'
import { processQuestions } from './processors'

//  This module can be used to carry out any additional validation / formatting required before sending data to the application

//  Note that validation and processing should happen in the webpack build rather than here, if possible: extend 'id-guide-data-validation-plugin'

export const entrypointQuestionId = 'leaf-type'

export const getCandidates = () => {
  return candidates
}

export const getQuestions = () => {
  // return questions
  return processQuestions(questions)
}
