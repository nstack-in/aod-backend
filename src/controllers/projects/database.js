const EndpointModel = require('../../models/projects/endpoint');

function insertDataEndpoint(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;

    req.body.__project__ = project_id;
    req.body.__endpoint__ = endpoint_id;
    req.body.__version__ = global.version;

    EndpointModel(req.body).save(function (err, data) {
        if (err)
            return res.status(401).json(err);
        return res.status(201).json(data);
    });
}

module.exports = {
    insertDataEndpoint: insertDataEndpoint,
}