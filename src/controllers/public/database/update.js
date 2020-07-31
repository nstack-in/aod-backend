const DatabaseModel = require('../../../models/database');
const Endpoint = require('../../../models/endpoint');

function update(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;
    let document_id = req.params.id;

    let filter = {
        __project__: project_id,
        _id: document_id
    };

    req.body.__project__ = project_id;

    Endpoint.findOne({ __project__: project_id, endpoint_id: endpoint_id }, function (err, data) {
        if (!data)
            return res.status(401).json({
                message: "No Endpoint found with this name",
                error: {
                    status: true,
                    message: "Invalid Endpoint ID"
                },
                data: data
            });
        filter['__endpoint__'] = data.id;
        req.body.__endpoint__ = data.id;
        DatabaseModel.findOneAndUpdate(
            filter,
            req.body,
            { new: true },
            function (err, data) {
                if (err) return res.json({
                    response_time: `${(Date.now() - req.start)}ms`,
                    data: [],
                    message: "Something went wrong",
                    error: {
                        message: err.message,
                    }
                });
                res.status(200).json({

                    response_time: `${(Date.now() - req.start)}ms`,
                    message: "Endpoint Data updated",
                    data: data
                });
            });
    });
}

module.exports = update;