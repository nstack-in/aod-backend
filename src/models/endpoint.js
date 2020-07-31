const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const EndpointSchema = Schema(
    {
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
        endpoint_id: {
            type: String,
            required: true,
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
        structured: {
            type: Boolean,
            required: true
        },
        models: [{
            name: { type: String, required: true },
            type: { type: String, required: true },
            max: { type: Number },
            _id: false
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);
EndpointSchema.index({ endpoint_id: 1, __owner__: 1, __project__: 1 }, { unique: true });

var Endpoint = Model('Endpoint', EndpointSchema);

module.exports = Endpoint;
