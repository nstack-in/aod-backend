const DatabaseModel = require('../../models/data/database');

function insertDataController(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;

    req.body.__project__ = project_id;
    req.body.__endpoint__ = endpoint_id;
    req.body.__version__ = global.version;

    DatabaseModel(req.body).save(function (err, data) {
        if (err)
            return res.status(401).json(err);
        return res.status(201).json(data);
    });
}

function getDataController(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;
    let page = parseInt(req.query.page, 10) || 0;
    let resultsPerPage = parseInt(req.query.perpage, 10) || 10;

    resultsPerPage = resultsPerPage < 25 ? resultsPerPage : 25;

    let filter = {}
    filter.__project__ = project_id;
    filter.__endpoint__ = endpoint_id;
    DatabaseModel
        .find(filter)
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        .then((result, err) => {
            if (err)
                return res.status(401).json({ result, err });
            return res.status(201).json({ err, result });
        });
}

module.exports = {
    insertDataController: insertDataController,
    getDataController: getDataController
}