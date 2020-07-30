const DatabaseModel = require('../../models/data/database');
const Endpoint = require('../../models/projects/endpoint');

function insertDataController(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;

    req.body.__project__ = project_id;

    Endpoint.findOne({ endpoint_id }, function (err, data) {
        req.body.__endpoint__ = data.id;
        DatabaseModel(req.body).save(function (err, data) {
            if (err)
                return res.status(401).json(err);
            return res.status(201).json(data);
        });
    })

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

function removeDataController(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;
    let document_id = req.params.id;

    let filter = {
        __project__: project_id,
        __endpoint__: endpoint_id,
        _id: document_id
    };
    DatabaseModel
        .findOneAndRemove(filter, (err, data) => {
            if (err)
                return res.status(401).json({ result, err });
            return res.status(202).json({
                response_time: Date.now() - req.start,
                message: "Endpoint Data updated",
                data: data
            });
        });
}

function updateDataController(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;
    let document_id = req.params.id;

    let filter = {
        __project__: project_id,
        __endpoint__: endpoint_id,
        _id: document_id
    };

    req.body.__project__ = project_id;
    req.body.__endpoint__ = endpoint_id;

    DatabaseModel.findOneAndUpdate(
        filter,
        req.body,
        { new: true },
        function (err, data) {
            if (err) return res.json({
                response_time: Date.now() - req.start,
                data: [],
                message: "Something went wrong",
                error: {
                    message: err.message,
                }
            });
            res.status(200).json({

                response_time: Date.now() - req.start,
                message: "Endpoint Data updated",
                data: data
            });
        });
}
function findDataController(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;
    let document_id = req.params.id;

    let filter = {
        __project__: project_id,
        __endpoint__: endpoint_id,
        _id: document_id
    };

    DatabaseModel.findOne(filter, function (err, data) {
        if (err) return res.json({
            response_time: Date.now() - req.start,
            data: [],
            message: "Something went wrong",
            error: {
                message: err.message,
            }
        });
        res.status(200).json({
            response_time: Date.now() - req.start,
            message: "GET BY ID",
            data: data
        });
    });
}
module.exports = {
    insertDataController: insertDataController,
    getDataController: getDataController,
    removeDataController: removeDataController,
    updateDataController: updateDataController,
    findDataController: findDataController
}