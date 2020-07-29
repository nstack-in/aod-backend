const projectRoutes = require('express').Router();
const { findDataController, insertDataController, getDataController, updateDataController, removeDataController } = require('../../controllers/projects/database');


projectRoutes.get('/', function (req, res) {
    res.status(200).json({
        "status": "This is project routes",
        "response_time": Date.now() - req.start,
    })
});

projectRoutes.get('/:pid/:eid', getDataController);
projectRoutes.post('/:pid/:eid', insertDataController);
projectRoutes.get('/:pid/:eid/:id', findDataController);
projectRoutes.put('/:pid/:eid/:id', updateDataController);
projectRoutes.delete('/:pid/:eid/:id', removeDataController);

module.exports = projectRoutes;