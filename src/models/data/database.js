const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const DatabaseSchema = Schema(
    {
        __project__: {
            type: String,
            required: true,
            select: false,
        },
        __endpoint__: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        versionKey: false,
        timestamps: true, strict: false,
    }
);

DatabaseSchema.index({ __owner__: 1, __endpoint__: 1 });

var Endpoint = Model('db', DatabaseSchema);

module.exports = Endpoint;
