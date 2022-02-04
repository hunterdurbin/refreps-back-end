const router = require('express').Router()
require('dotenv').config({ path: '.env' })
const multer = require('multer')()

const useCases = require('../use-cases/index')

router
	.route('/')
	.get(async (req, res) => {
		try {
			const result = await useCases.course.findAllCourses()
			res.send(result.courses)
		} catch (error) {
			res.status(400).send(error)
		}
	})
	.post(multer.none(), async (req, res) => {
		try {
			const course = await useCases.course.addCourse(req.body)
			res.send(course)
		} catch (error) {
			res.status(400).send(error)
		}
	})

router
	.route('/:courseId')
	.get(async (req, res) => {
		try {
			const { courseId } = req.params
			const result = await useCases.course.findCourseById(courseId)
			res.send(result.course)
		} catch (error) {
			res.status(400).send(error)
		}
	})
	.delete(async (req, res) => {
		try {
			const { courseId } = req.params
			const result = await useCases.course.deleteCourse(courseId)
			res.send(result)
		} catch (error) {
			res.status(400).send(error)
		}
	})
	.put(multer.none(), async (req, res) => {
		try {
			const { courseId } = req.params
			const result = await useCases.course.updateCourse(courseId, req.body)
			res.send(result.course)
		} catch (error) {
			res.status(400).send(error)
		}
	})

router.route('/:courseId/copy').post(multer.none(), async (req, res) => {
	try {
		const { courseId } = req.params
		const overrides = req.body

		const course = await useCases.course.copyCourse(courseId, overrides)

		const { sections } = await useCases.section.findAllSections(courseId)
		sections.forEach(async (section) => {
			// Copy all sections and bind them to the new course
			let sectionCopy = await useCases.section.copySection(
				section._id,
				course._id
			)

			let { modules } = await useCases.module_.findAllModules(section._id)
			modules.forEach(async (module_) => {
				// Copy all modules and bind them to the new section, resp.
				let moduleCopy = await useCases.module_.copyModule(
					module_._id,
					sectionCopy._id
				)
				let { contents } = await useCases.content.findAllContents(module_._id)
				contents.forEach(async (content) => {
					// Copy the document that the Content points to (if needed)
					let bindDocumentId
					switch (content.onModel) {
						case 'Video':
							bindDocumentId = content.toDocument
							break
						case 'Quiz':
							const quiz = await useCases.quiz.copyQuiz(content.toDocument)
							bindDocumentId = quiz._id
						default:
							bindDocumentId = content.toDocument
					}

					// Copy the Content, bind the Content to its resp Module, and
					// bind the document
					await useCases.content.copyContent(
						content._id,
						moduleCopy._id,
						bindDocumentId
					)

					// TODO: If video -> dont do anything else
					// If quiz -> copy the quiz (change toDocument in content) so that it can be edited
				})
			})
		})

		res.status(201).send()
	} catch (error) {
		res.status(400).send(error)
	}
})

module.exports = router
