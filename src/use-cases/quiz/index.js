const Quiz = require('../../database/models/quiz.model')
const QuizSubmission = require('../../database/models/quizSubmission.model')
const QuizVersion = require('../../database/models/quizVersion.model')
const Content = require('../../database/models/content.model')

const makeAddQuestions = require('./addQuestions')
const makeAddQuiz = require('./addQuiz')
const makeBatchUpdateQuestions = require('./batchUpdateQuestions')
const makeCopyQuiz = require('./copyQuiz')
const makeDeleteQuestions = require('./deleteQuestions')
const makeFindContentQuizBelongsTo = require('./findContentQuizBelongsTo')
const makeFindQuizById = require('./findQuizById')
const makeGetAllSubmissionGrades = require('./getAllSubmissionGrades')
const makeStartQuiz = require('./startQuiz')

const addQuestions = makeAddQuestions({ Quiz, QuizVersion })
const addQuiz = makeAddQuiz({ Quiz, QuizVersion })
const batchUpdateQuestions = makeBatchUpdateQuestions({ Quiz, QuizVersion })
const copyQuiz = makeCopyQuiz({ Quiz, QuizVersion })
const deleteQuestions = makeDeleteQuestions({ Quiz, QuizVersion })
const findContentQuizBelongsTo = makeFindContentQuizBelongsTo({ Quiz, Content })
const findQuizById = makeFindQuizById({ Quiz, QuizVersion })
const getAllSubmissionGrades = makeGetAllSubmissionGrades({
	Quiz,
	QuizSubmission,
})
const startQuiz = makeStartQuiz({ Quiz, QuizVersion, QuizSubmission })

module.exports = {
	addQuestions,
	addQuiz,
	batchUpdateQuestions,
	copyQuiz,
	deleteQuestions,
	findContentQuizBelongsTo,
	findQuizById,
	getAllSubmissionGrades,
	startQuiz,
}
