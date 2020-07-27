const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const ProjectSchema = Schema(
    {
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
        timestamps: true
    }
);

var Project = Model('project', ProjectSchema);

module.exports = Project;
