const ProjectModel = require('../../models/project');
const mongoose = require('mongoose')


function createProject(req, res) {
    req.body.__owner__ = req.headers['user'].data.id;
    req.body.__version__ = global.version;
    let currentTime = Date.now();
    if (req.body.name != "")
        req.body._id = (req.body.name + ' ' + currentTime).split(' ').join('-').toLocaleLowerCase();

    ProjectModel(req.body).save(function (err, data) {
        if (err) return res.status(403).json({
            response_time: `${(Date.now() - req.start) % 200}ms`,
            data: [],
            message: "Something went wrong",
            error: {
                code: err.code,
                status: true,
                message: err.message,
            },
        });

        res.status(201).json({
            response_time: `${(Date.now() - req.start) % 200}ms`,
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
            response_time: `${(Date.now() - req.start) % 200}ms`,
            message: "List of Created Project",
            data: data,
            status: {
                type: "SUCCESS",
            },
        });
    });

}

function findProjects(req, res) {
    let user_id = req.headers['user'].data.id;
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
                response_time: `${(Date.now() - req.start) % 200}ms`,
                message: "Project By ID",
                data: data
            });
        });

}

function updateProject(req, res) {
    let user_id = req.headers['user'].data.id;
    var valid = mongoose.Types.ObjectId.isValid(req.params.pid);
    let update = (({ name, description }) => ({ name, description }))(req.body);
    update.__owner__ = req.headers['user'].data.id;
    ProjectModel.findOneAndUpdate(
        { __owner__: user_id, _id: req.params.pid },
        update,
        { new: true },
        function (err, data) {
            if (err) return res.json({
                response_time: `${(Date.now() - req.start) % 200}ms`,
                data: [],
                message: "Something went wrong",
                error: {
                    message: err.message,
                }
            });
            res.status(200).json({
                response_time: `${(Date.now() - req.start) % 200}ms`,
                message: "Updated the Project",
                data: data
            });
        });

}
function removeProject(req, res) {
    let user_id = req.headers['user'].data.id;
    ProjectModel.findOneAndRemove(
        { __owner__: user_id, _id: req.params.pid },
        function (err) {
            if (err) return res.status(401).json({
                response_time: `${(Date.now() - req.start) % 200}ms`,
                data: [],
                message: "Something went wrong",
                error: {
                    status: true,
                    message: err.message,
                }
            });
            res.status(200).json({
                response_time: `${(Date.now() - req.start) % 200}ms`,
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