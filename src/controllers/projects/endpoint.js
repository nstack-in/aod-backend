const EndpointModel = require('../../models/endpoint');
const ProjectModel = require('../../models/project');
const mongoose = require('mongoose')

function createEndpoint(req, res) {
    let project_id = req.params.pid;
    let user_id = req.headers['user'].data.id

    req.body.__project__ = project_id;
    req.body.__owner__ = user_id;
    req.body.__version__ = global.version;
    if (req.body.name != null)
        req.body.endpoint_id = req.body.name.split(' ').join('-').toLocaleLowerCase();
    else
        req.body.endpoint_id = null;

    EndpointModel(req.body).save(function (err, data) {
        if (err) {
            return res.status(401).json({ type: 45, err });
        } else {
            ProjectModel.findOneAndUpdate(
                { _id: project_id },
                { $push: { endpoints: data._id } },
                { new: true }, function (err, data) {
                    if (err) {
                        return res.status(401).json({ type: 3, err });
                    } else {
                        return res.status(201).json({
                            response_time: `${Date.now() - req.start}ms`,
                            message: "Create Endpoints",
                            data: data,
                        });
                    }
                });
        }
    });
}

function deleteEndpoint(req, res) {
    let user_id = req.headers['user'].data.id
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;

    let __owner__ = user_id;
    let __project__ = project_id;
    let _id = endpoint_id;
    // var valid = mongoose.Types.ObjectId.isValid(_id);
    // if (!valid) {
    //     return res.status(401).json({
    //         response_time: `${Date.now() - req.start}ms`,
    //         message: "Invalid Project ID",
    //     });
    // }
    EndpointModel.findOneAndDelete({ __project__, __owner__, endpoint_id: _id }, function (err, data) {
        if (err)
            return res.status(401).json(err);
        return res.status(205).json(data);
    });
}
function findEndpoint(req, res) {
    let user_id = req.headers['user'].data.id
    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;

    let __owner__ = user_id;
    let __project__ = project_id;
    let _id = endpoint_id;
    var valid = mongoose.Types.ObjectId.isValid(_id);
    if (!valid) {
        return res.status(401).json({
            response_time: `${Date.now() - req.start}ms`,
            message: "Invalid Project ID",
        });
    }
    EndpointModel.findOne({ __project__, __owner__, _id }, function (err, data) {
        if (err)
            return res.status(401).json(err);
        return res.status(200).json(data);
    });
}
function listEndpoint(req, res) {
    let user_id = req.headers['user'].data.id
    let project_id = req.params.pid;

    let __owner__ = user_id;
    let __project__ = project_id;

    var valid = mongoose.Types.ObjectId.isValid(__project__);

    if (!valid) {
        return res.status(401).json({
            response_time: `${Date.now() - req.start}ms`,
            message: "Invalid Project ID",
        });
    }

    EndpointModel.find({ __project__, __owner__ }, function (err, data) {
        if (err)
            return res.status(401).json({
                response_time: `${Date.now() - req.start}ms`,
                message: "Project Not Available in Db",
                error: {
                    status: true,
                }
            });
        return res.status(200).json({
            response_time: `${Date.now() - req.start}ms`,
            message: "LIST ENDPOINT ",
            data: data,
            error: {
                status: false,
            }
        });
    });
}
module.exports = {
    createEndpoint: createEndpoint,
    deleteEndpoint: deleteEndpoint,
    findEndpoint: findEndpoint,
    listEndpoint: listEndpoint,
}