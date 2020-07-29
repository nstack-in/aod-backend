const ProjectModel = require('../../models/projects/project');
const mongoose = require('mongoose')


function createProject(req, res) {
    req.body.__owner__ = req.headers['user'].data.id;
    ProjectModel(req.body).save(function (err, data) {
        if (err) return res.status(403).json({
            response_time: Date.now() - req.start,
            data: [],
            message: "Something went wrong",
            error: {
                code: err.code,
                status: true,
                message: err.message,
            },
        });
        res.status(201).json({
            response_time: Date.now() - req.start,
            message: "Project Created",
            data: data,
            error: {
                code: "",
                status: false,
                message: "",
            },
        });
    });

}

function listProjects(req, res) {
    let user_id = req.headers['user'].data.id;
    ProjectModel.find({ __owner__: user_id }, function (err, data) {
        if (err) return res.json({
            response_time: Date.now() - req.start,
            data: [],
            message: "Project Not Found",
            status: {
                type: "ERROR",
            },
        });
        res.status(200).json({
            response_time: Date.now() - req.start,
            message: "List of Created Project",
            data: data,
            status: {
                type: "SUCCESS",
            },
        });
    });

}

function findProjects(req, res) {
    console.log(req.params)
    let user_id = req.headers['user'].data.id;
    var valid = mongoose.Types.ObjectId.isValid(req.params.pid);
    if (!valid) {
        return res.status(401).json({
            response_time: Date.now() - req.start,
            message: "Invalid Project ID",
        });
    }
    ProjectModel.findOne({ __owner__: user_id, _id: req.params.pid }, function (err, data) {
        if (err) return res.json({
            response_time: Date.now() - req.start,
            data: [],
            message: "Something went wrong",
            error: err.message,
        });
        res.status(200).json({
            response_time: Date.now() - req.start,
            message: "Project By ID",
            data: data
        });
    });

}

function updateProject(req, res) {
    let user_id = req.headers['user'].data.id;
    var valid = mongoose.Types.ObjectId.isValid(req.params.pid);
    if (!valid) {
        return res.status(401).json({
            response_time: Date.now() - req.start,
            message: "Invalid Project ID",
        });
    }
    let update = (({ name, description }) => ({ name, description }))(req.body);
    update.__owner__ = req.headers['user'].data.id;
    ProjectModel.findOneAndUpdate(
        { __owner__: user_id, _id: req.params.pid },
        update,
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
                message: "Updated the Project",
                data: data
            });
        });

}
function removeProject(req, res) {
    let user_id = req.headers['user'].data.id;
    var valid = mongoose.Types.ObjectId.isValid(req.params.pid);
    if (!valid) {
        return res.status(401).json({
            response_time: Date.now() - req.start,
            message: "Invalid Project ID",
        });
    }
    ProjectModel.findOneAndRemove(
        { __owner__: user_id, _id: req.params.pid },
        function (err) {
            if (err) return res.status(401).json({
                response_time: Date.now() - req.start,
                data: [],
                message: "Something went wrong",
                error: {
                    status: true,
                    message: err.message,
                }
            });
            res.status(200).json({
                response_time: Date.now() - req.start,
                message: "Project Removed",
                data: [],
            });
        });
}
module.exports = {
    create: createProject,
    update: updateProject,
    list: listProjects,
    find: findProjects,
    remove: removeProject
}