const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const ProjectSchema = Schema(
    {
        __version__: String,
        project: {
            type: String,
            required: true,
            select: false,
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        model: [{
            id: String,

        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

var Project = Model('project', ProjectSchema);

module.exports = Project;
