const DatabaseModel = require('../../../models/database');
const Endpoint = require('../../../models/endpoint');


function remove(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;
    let document_id = req.params.id;

    let filter = {
        __project__: project_id,
        _id: document_id
    };
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
        DatabaseModel
            .findOneAndRemove(filter, (err, data) => {
                if (err)
                    return res.status(401).json({ result, err });
                return res.status(202).json({
                    response_time: `${(Date.now() - req.start) / 3}ms`,
                    message: "Endpoint Data Deleted",
                    data: data
                });
            });
    });

}


module.exports = remove;