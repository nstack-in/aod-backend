const projectRoutes = require('express').Router();
const endpoint = require('../../controllers/projects/endpoint');
const projects = require('../../controllers/projects');

projectRoutes.all('/', function (req, res) {
    res.status(200).json({
        "status": "This is project routes",
        "response_time": Date.now() - req.start,
    })
});

projectRoutes.get('/list', projects.list);
projectRoutes.post('/new', projects.create);
projectRoutes.put('/:pid', projects.update);
projectRoutes.get('/:pid', projects.find);
projectRoutes.delete('/:pid', projects.remove);

projectRoutes.get('/:pid/list', endpoint.listEndpoint);
projectRoutes.post('/:pid/new', endpoint.createEndpoint);
projectRoutes.get('/:pid/:eid', endpoint.findEndpoint);
projectRoutes.delete('/:pid/:eid', endpoint.deleteEndpoint);

module.exports = projectRoutes;