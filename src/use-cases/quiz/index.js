const Quiz = require('../../database/models/quiz.model')
const QuizSubmission = require('../../database/models/quizSubmission.model')
const QuizVersion = require('../../database/models/quizVersion.model')
const QuizJson = require('../../utils/quiz/quizJson')

const makeAddQuestions = require('./addQuestions')
const makeAddQuiz = require('./addQuiz')
const makeCopyQuiz = require('./copyQuiz')
const makeDeleteQuestions = require('./deleteQuestions')
const makeFindQuizById = require('./findQuizById')
const makeGradeSubmission = require('./gradeSubmission')
const makeGetAllSubmissionGrades = require('./getAllSubmissionGrades')
const makeGetSubmissionGrade = require('./getSubmissionGrade')
const makeSaveAnswersInSubmission = require('./saveAnswersInSubmission')
const makeStartQuiz = require('./startQuiz')

const addQuestions = makeAddQuestions({ Quiz, QuizVersion })
const addQuiz = makeAddQuiz({ Quiz, QuizVersion })
const copyQuiz = makeCopyQuiz({ Quiz, QuizVersion })
const deleteQuestions = makeDeleteQuestions({ Quiz, QuizVersion })
const findQuizById = makeFindQuizById({ Quiz, QuizVersion })
const gradeSubmission = makeGradeSubmission({ Quiz, QuizJson, QuizSubmission })
const getAllSubmissionGrades = makeGetAllSubmissionGrades({ QuizSubmission })
const getSubmissionGrade = makeGetSubmissionGrade({ QuizSubmission })
const saveAnswersInSubmission = makeSaveAnswersInSubmission({ QuizSubmission })
const startQuiz = makeStartQuiz({ Quiz, QuizSubmission, QuizJson })

module.exports = {
	addQuestions,
	addQuiz,
	copyQuiz,
	deleteQuestions,
	findQuizById,
	gradeSubmission,
	getAllSubmissionGrades,
	getSubmissionGrade,
	saveAnswersInSubmission,
	startQuiz,
}
