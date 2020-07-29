const projectRoutes = require('express').Router();
const { createEndpoint, listEndpoint, deleteEndpoint, findEndpoint } = require('../../controllers/projects/endpoint');
const { create, list, find, update, remove } = require('../../controllers/projects');

projectRoutes.get('/', function (req, res) {
    res.status(200).json({
        "status": "This is project routes",
        "response_time": Date.now() - req.start,
    })
});

projectRoutes.get('/list', list);
projectRoutes.post('/new', create);
projectRoutes.put('/:pid', update);
projectRoutes.get('/:pid', find);
projectRoutes.delete('/:pid', remove);

projectRoutes.get('/:pid/list', listEndpoint);
projectRoutes.post('/:pid/new', createEndpoint);
projectRoutes.get('/:pid/:eid', findEndpoint);
projectRoutes.delete('/:pid/:eid', deleteEndpoint);

module.exports = projectRoutes;