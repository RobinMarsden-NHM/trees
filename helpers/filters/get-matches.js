export default (candidateSet, filter) => {
  if (filter.type === 'include') {
    if (typeof filter.value === 'string') {
      candidateSet = candidateSet.filter((candidate) => {
        if (typeof candidate[filter.attribute][filter.questionId] === 'string') {
          //  filter value and candidate attribute are both strings
          //  ...return candidates whose attribute value matches filter value
          return candidate[filter.attribute][filter.questionId] === filter.value
        } else if (Array.isArray(candidate[filter.attribute][filter.questionId])) {
          //  filter value is string, candidate attribute is an array
          //  ...return candidates whose attribute value array contains filter value
          return candidate[filter.attribute][filter.questionId].includes(filter.value)
        }
      })
    } else if (Array.isArray(filter.value)) {
      candidateSet = candidateSet.filter((candidate) => {
        if (typeof candidate[filter.attribute][filter.questionId] === 'string') {
          //  filter value is an array, candidate attribute is a string
          //  ...return any candidates with attribute present in filter value array
          return filter.value.includes(candidate[filter.attribute][filter.questionId])
        } else if (Array.isArray(candidate[filter.attribute][filter.questionId])) {
          //  filter value and candidate attribute are both arrays
          //  ...return candidates where both arrays contain at least one common value
          const res = candidate[filter.attribute][filter.questionId].filter((element) => {
            return filter.value.includes(element)
          })
          return res.length > 0
        }
      })
    }
  } else if (filter.type === 'exclude') {
    if (typeof filter.value === 'string') {
      candidateSet = candidateSet.filter((candidate) => {
        if (typeof candidate[filter.attribute][filter.questionId] === 'string') {
          //  filter value and candidate attribute are both strings
          //  ...return candidates whose attribute value does not match filter value
          return candidate[filter.attribute][filter.questionId] !== filter.value
        } else if (Array.isArray(candidate[filter.attribute][filter.questionId])) {
          //  filter value is string, candidate attribute is an array
          //  ...return candidates whose attribute value array does not contain filter value
          return !candidate[filter.attribute][filter.questionId].includes(filter.value)
        }
      })
    } else if (Array.isArray(filter.value)) {
      candidateSet = candidateSet.filter((candidate) => {
        if (typeof candidate[filter.attribute][filter.questionId] === 'string') {
          //  filter value is an array, candidate attribute is a string
          //  ...return any candidates with attribute not present in filter value array
          return !filter.value.includes(candidate[filter.attribute][filter.questionId])
        } else if (Array.isArray(candidate[filter.attribute][filter.questionId])) {
          //  filter value and candidate attribute are both arrays
          //  ...return candidates where arrays contain no common values
          const res = candidate[filter.attribute][filter.questionId].filter((element) => {
            return filter.value.includes(element)
          })
          return res.length === 0
        }
      })
    }
  }
  return candidateSet
}
