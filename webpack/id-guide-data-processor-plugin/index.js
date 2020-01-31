const fs = require('fs')
const path = require('path')
const camelcase = require('camelcase')

module.exports = class IdGuideDataValidationPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    const opts = this.options

    compiler.plugin('emit', function (compilation, callback) {
      consola.info(`\nRunning ID guide data processor plugin\n`)

      const candidates = []
      const questions = []

      //  **************************************************************
      //  Process and validate candidate data
      //  **************************************************************

      //  Get list of all directories in candidate dir
      const candidateNames = fs.readdirSync(path.join(opts.dataDir, opts.candidateDir), { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

      //  Process and validate contents of candidate dirs
      candidateNames.map((candidateName) => {
        try {
          //  Validate candidate JSON files and compile master candidate obj
          const candidateData = JSON.parse(fs.readFileSync(path.join(opts.dataDir, opts.candidateDir, candidateName, `${candidateName}.json`)))
          if (candidateName !== candidateData.id) {
            throw new Error('candidate ID mismatch')
          }
          candidates.push(candidateData)
        } catch (err) {
          throw new Error(`candidate datafile '${candidateName}.json' is missing or invalid`)
        }

        //  Check that candidate folders includes required files
        const requiredCandidateFiles = [
          'main.jpg',
          'Result.vue'
        ]
        requiredCandidateFiles.map((requiredFile) => {
          const requiredFilePath = path.join(opts.dataDir, opts.candidateDir, candidateName, requiredFile)
          if (!fs.existsSync(requiredFilePath)) {
            throw new Error(`Missing '${requiredFile}' for candidate '${candidateName}'`)
          }
        })

        //  Check that the result component is correctly registered in 'result-components.js'
        const resultComponentFile = fs.readFileSync(path.join(opts.dataDir, 'result-components.js'), 'utf8')
        const componentName = camelcase(candidateName, { pascalCase: true })
        const importString = `import ${componentName} from './${opts.candidateDir}/${candidateName}/Result'`
        if (!resultComponentFile.includes(importString)) {
          throw new Error(`Missing or invalid Vue result component import for candidate '${candidateName}' in 'result-components.js'`)
        }
        const exportString = `id: '${candidateName}', component: ${componentName}`
        if (!resultComponentFile.includes(exportString)) {
          throw new Error(`Missing or invalid Vue result component export for candidate '${candidateName}' in 'result-components.js'`)
        }
      })

      //  **************************************************************
      //  Process and validate question data
      //  **************************************************************

      //  Read question JSON files, check they are syntactically valid, add to master object
      //  ************* to do - check all question IDs are unique ***********
      const questionNames = fs.readdirSync(path.join(opts.dataDir, opts.questionDir), { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

      //  Process and validate contents of candidate dirs
      questionNames.map((questionName) => {
        try {
          //  Validate question JSON files and compile master question obj
          const questionData = JSON.parse(fs.readFileSync(path.join(opts.dataDir, opts.questionDir, questionName, `${questionName}.json`)))
          questionData.filters.forEach((filter) => {
            filter.questionId = questionData.id
            filter.attribute = questionData.attribute
            //  If filter has a string value, convert to array
            if (typeof filter.value === 'string') {
              filter.value = filter.value.split()
            }
          })
          questions.push(questionData)
        } catch (err) {
          throw new Error(`question datafile '${questionName}.json' is missing or invalid`)
        }
      })

      //  Validate all candidate data against questions
      candidates.forEach((candidate) => {
        questions.forEach((question) => {
          //  First, check if candidate has that attribute - if not, initialize it
          if (typeof candidate[question.attribute] === 'undefined') {
            candidate[question.attribute] = {}
          }
          //  Then check if candidate has that question for that attribute - if not, initialize it
          if (typeof candidate[question.attribute][question.id] === 'undefined') {
            candidate[question.attribute][question.id] = []
          }
          //  If candidate has an answer to that question of type string, convert to an array
          if (typeof candidate[question.attribute][question.id] === 'string') {
            candidate[question.attribute][question.id] = candidate[question.attribute][question.id].split()
          }
          //  Check that all values candidate has for this attribute are valid
          const candidateValues = candidate[question.attribute][question.id]
          candidateValues.map((value) => {
            const matches = question.filters.filter((filter) => {
              return filter.value.includes(value)
            })
            if (matches.length < 1) {
              throw new Error(`Candidate '${candidate.id}' has an invalid value for '${question.id}': '${value}'`)
            }
          })
          //  If question has a default answer and candidate does not include any answers, set the default
          if (question.default && candidateValues.length < 1) {
            candidateValues.push(question.default)
          }
          //  If question has a common value, add it
          if (question.common && typeof question.common === 'string') {
            candidateValues.push(question.common)
          }
          //  Finally, throw an error if candidate still has no answers to this question
          if (candidateValues.length < 1) {
            throw new Error(`Candidate '${candidate.id}' has no valid values for '${question.id}'`)
          }
        })
        // consola.info(candidate)
      })

      //  Save output files
      try {
        fs.writeFileSync(path.join(opts.dataDir, 'candidates.json'), JSON.stringify(candidates, null, 2), 'utf8')
      } catch (err) {
        throw new Error(`Error writing new file: candidates.json`)
      }

      try {
        fs.writeFileSync(path.join(opts.dataDir, 'questions.json'), JSON.stringify(questions, null, 2), 'utf8')
      } catch (err) {
        throw new Error(`Error writing new file: questions.json`)
      }

      //  Make output files available to webpack
      compilation.assets[opts.candidateFileName] = {
        source: () => candidates,
        size: () => candidates.length
      }

      compilation.assets[opts.questionFileName] = {
        source: () => questions,
        size: () => questions.length
      }

      callback()
    })
  }
}
