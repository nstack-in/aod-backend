const ProjectModel = require('../../models/project');
const EndpointModel = require('../../models/endpoint');
const mongoose = require('mongoose')


function createProject(req, res) {
    req.body.__owner__ = req.headers['user'].data._id;
    req.body.__version__ = global.version;
    let currentTime = Date.now();
    if (req.body.name != "")
        req.body._id = (req.body.name + ' ' + currentTime).split(' ').join('-').toLocaleLowerCase();

    ProjectModel(req.body).save(function (err, data) {
        if (err) return res.status(403).json({
            response_time: `${(Date.now() - req.start)}ms`,
            data: [],
            message: "Something went wrong",
            error: {
                code: err.code,
                status: true,
                message: err.message,
            },
        });

        res.status(201).json({
            response_time: `${(Date.now() - req.start)}ms`,
            message: "Project Created",
            data: data,
            error: {
                code: 0,
                status: false,
                message: null,
            },
        });
    });

}

function listProjects(req, res) {
    let user_id = req.headers['user'].data._id;
    ProjectModel.find({ __owner__: user_id }).populate("endpoints").then(function (data) {
        // if (err) return res.json({
        //      response_time: `${(Date.now() - req.start)/3}ms`,
        //     data: [],
        //     message: "Project Not Found",
        //     status: {
        //         type: "ERROR",
        //     },
        // });
        res.status(200).json({
            response_time: `${(Date.now() - req.start)}ms`,
            message: "List of Created Project",
            data: data,
            status: {
                type: "SUCCESS",
            },
        });
    });

}

function findProjects(req, res) {
    let user_id = req.headers['user'].data._id;
    ProjectModel.findOne({ __owner__: user_id, _id: req.params.pid })
        .populate("endpoints")
        .then(function (data) {
            // if (err) return res.json({
            //      response_time: `${(Date.now() - req.start)/3}ms`,
            //     data: [],
            //     message: "Something went wrong",
            //     error: err.message,
            // });
            res.status(200).json({
                response_time: `${(Date.now() - req.start)}ms`,
                message: "Project By ID",
                data: data
            });
        });

}

function updateProject(req, res) {
    let user_id = req.headers['user'].data._id;
    let update = (({ name, description }) => ({ name, description }))(req.body);
    update.__owner__ = user_id;
    ProjectModel.findOneAndUpdate(
        { __owner__: user_id, _id: req.params.pid },
        update,
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
                message: "Updated the Project",
                data: data
            });
        });

}
async function removeProject(req, res) {
    let user_id = req.headers['user'].data._id;
    let project_id = req.params.pid;
    try {
        await EndpointModel.remove({ __project__: project_id, __owner__: user_id });
        await ProjectModel.findOneAndRemove({ __owner__: user_id, _id: project_id });

        res.status(200).json({
            response_time: `${(Date.now() - req.start)}ms`,
            message: "Project Removed",
            data: [],
        });
    } catch (error) {
        return res.status(401).json({
            response_time: `${(Date.now() - req.start)}ms`,
            data: [],
            message: "Something went wrong",
            error: {
                status: true,
                message: error.message,
            }
        });
    }
}
module.exports = {
    create: createProject,
    update: updateProject,
    list: listProjects,
    find: findProjects,
    remove: removeProject
}