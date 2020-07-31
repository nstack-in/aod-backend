const DatabaseModel = require('../../../models/database');
const Endpoint = require('../../../models/endpoint');

async function insert(req, res) {
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;

    req.body.__project__ = project_id;

    // let data = await Endpoint.findOne({ endpoint_id });
    // console.log({ data });

    Endpoint.findOne({ endpoint_id }, function (err, data) {
        if (!data)
            return res.status(401).json({
                message: "No Endpoint found with this name",
                error: {
                    status: true,
                    message: "Invalid Endpoint ID"
                },
                data: []
            });
        req.body.__endpoint__ = data.id;
        DatabaseModel(req.body).save(function (err, data) {
            if (err)
                return res.status(401).json({
                    error: {
                        message: err,
                        status: true,
                    }
                });
            return res.status(201).json({
                response_time: `${Date.now() - req.start}ms`,
                message: "Data Inserted",
                data,
                error: {
                    message: "",
                    status: false,
                }
            });
        });
    })

}


module.exports = insert;