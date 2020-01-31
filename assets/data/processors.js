//  Apply any data modifiers or perform sanity checks on the data on load, eg check that all IDs are unique

export const processQuestions = (questions) => {
  questions = addQuestionsToFilters(questions)
  return questions
}

const addQuestionsToFilters = (questions) => {
  questions.forEach((question) => {
    question.filters.forEach((filter) => {
      filter.question = question
    })
  })
  return questions
}
