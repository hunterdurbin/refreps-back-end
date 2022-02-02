module.exports = makeCopySection = ({ Section }) => {
	// Copy a section
	// Resolve -> section object
	// Reject -> error name
	return async function copySection(sectionId, bindCourseId) {
		return new Promise(async (resolve, reject) => {
			try {
				const section = await Section.findById(sectionId)

				if (!section) {
					throw ReferenceError('Not Found')
				}

				const sectionInfo = Object.assign(
					{},
					{
						name: section.name,
						courseId: bindCourseId,
						isPublished: section.isPublished,
						sectionOrder: section.sectionOrder,
						dropDate: section.dropDate,
					}
				)

				const copySection = new Section(sectionInfo)

				const saved = await copySection.save()
				return resolve(saved.toObject())
			} catch (err) {
				return reject(err)
			}
		})
	}
}
