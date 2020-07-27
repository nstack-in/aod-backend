const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const ProjectSchema = Schema(
    {
        owner: {
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

        }],
        shared_with: {
            type: [{
                user_id: String,
                user_email: String,
            }],
            validate: [shareLimit, 'You can\'t share with more than 1 friends']
        }
    },
    {
        timestamps: true
    }
);

function shareLimit(val) {
    return val.length < 2;
}

var Project = Model('project', ProjectSchema);

ProjectSchema.path('owner').validate(async (value) => {
    const projectCount = await Project.countDocuments({ owner: value });
    return projectCount < 3;
}, 'You have limit of 3 projects');

module.exports = Project;
