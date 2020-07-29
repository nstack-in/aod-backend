const projectRoutes = require('express').Router();
const { insertDataController, getDataController } = require('../../controllers/projects/database');


projectRoutes.get('/', function (req, res) {
    res.status(200).json({
        "status": "This is project routes",
        "response_time": Date.now() - req.start,
    })
});

projectRoutes.get('/:pid/:eid', getDataController);
projectRoutes.post('/:pid/:eid', insertDataController);

module.exports = projectRoutes;