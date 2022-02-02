const Module = require('../../database/models/module.model')

const makeAddModule = require('./addModule')
const makeCollapseModule = require('./collapseModules')
const makeCopyModule = require('./copyModule')
const makeDeleteModule = require('./deleteModule')
const makeFindAllModules = require('./findAllModules')
const makeFindModuleById = require('./findModuleById')
const makeMoveModuleOrder = require('./moveModuleOrder')
const makeUpdateModule = require('./updateModule')

const addModule = makeAddModule({ Module })
const collapseModule = makeCollapseModule({ Module })
const copyModule = makeCopyModule({ Module })
const deleteModule = makeDeleteModule({ Module })
const findAllModules = makeFindAllModules({ Module })
const findModuleById = makeFindModuleById({ Module })
const moveModuleOrder = makeMoveModuleOrder({ Module })
const updateModule = makeUpdateModule({ Module })

module.exports = {
	addModule,
	collapseModule,
	copyModule,
	deleteModule,
	findAllModules,
	findModuleById,
	moveModuleOrder,
	updateModule,
}
