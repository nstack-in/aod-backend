const projectRoutes = require('express').Router();
const database = require('../../controllers/public/database');


projectRoutes.get('/', function (req, res) {
    res.status(200).json({
        "status": "This is user data routes",
        "response_time": Date.now() - req.start,
    })
});

projectRoutes.get('/:pid/:eid', database.getDataController);
projectRoutes.post('/:pid/:eid', database.insertDataController);
projectRoutes.get('/:pid/:eid/:id', database.findDataController);
projectRoutes.put('/:pid/:eid/:id', database.updateDataController);
projectRoutes.delete('/:pid/:eid/:id', database.removeDataController);

module.exports = projectRoutes;