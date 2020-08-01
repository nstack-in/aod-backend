const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const ProjectSchema = Schema(
    {
        _id: { type: String },
        __version__: {
            type: String,
            required: true,
            select: false,
        },
        __owner__: {
            type: Schema.Types.ObjectId,
            required: true,
            select: false,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,

        },
        private: {
            type: Boolean,
            required: true
        },
        secure: {
            type: Boolean,
            required: true
        },
        endpoints: [{
            type: Schema.Types.ObjectId,
            ref: "Endpoint"
        }],
        keys: [{
            name: { type: String, required: true },
            token: { type: String, required: true }
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
        timestamps: true,
        versionKey: false
    }
);

function shareLimit(val) {
    return val.length < 2;
}

var Project = Model('Project', ProjectSchema);

ProjectSchema.path('__owner__').validate(async (value) => {
    const projectCount = await Project.countDocuments({ __owner__: value });
    return projectCount < 3;
}, 'You have limit of 3 projects');

module.exports = Project;
