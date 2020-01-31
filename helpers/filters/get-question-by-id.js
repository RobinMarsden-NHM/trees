export default (questions, questionId) => {
  return questions.find((question) => {
    return question.id === questionId
  })
}
