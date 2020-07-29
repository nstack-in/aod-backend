const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const EndpointSchema = Schema(
    {
        __version__: String,
        __owner__: {
            type: String,
            required: true,
            select: false,
        },
        __project__: {
            type: String,
            required: true,
            select: false,
        },
        name: {
            type: String,
            required: true
        },
        methods: {
            GET: {
                enabled: {
                    type: Boolean,
                    required: true
                },
                secure: {
                    type: Boolean,
                    required: true
                },
                key: String
            },
            GET_ALL: {
                enabled: {
                    type: Boolean,
                    required: true
                },
                secure: {
                    type: Boolean,
                    required: true
                },
                key: String
            },
            POST: {
                enabled: {
                    type: Boolean,
                    required: true
                },
                secure: {
                    type: Boolean,
                    required: true
                },
                key: String
            },
            DELETE: {
                enabled: {
                    type: Boolean,
                    required: true
                },
                secure: {
                    type: Boolean,
                    required: true
                },
                key: String
            },
            PATCH: {
                enabled: {
                    type: Boolean,
                    required: true
                },
                secure: {
                    type: Boolean,
                    required: true
                },
                key: String
            }
        },
        models: [{
            name: { type: String, required: true },
            type: { type: String, required: true },
            max: { type: String },
            _id: false
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

var Endpoint = Model('endpoint', EndpointSchema);

module.exports = Endpoint;
