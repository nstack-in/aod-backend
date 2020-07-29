const projectRoutes = require('express').Router();
const { create, list, find, update } = require('../../controllers/projects');

projectRoutes.get('/', function (req, res) {
    res.status(200).json({
        "status": "This is project routes",
        "response_time": Date.now() - req.start,
    })
});

projectRoutes.get('/list', list);
projectRoutes.post('/new', create);
projectRoutes.put('/:id', update);
projectRoutes.get('/:id', find);

module.exports = projectRoutes;