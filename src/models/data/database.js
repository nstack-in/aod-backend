const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const DatabaseSchema = Schema(
    {
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
        __endpoint__: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        timestamps: true, strict: false
    }
);

DatabaseSchema.index({ name: 1 });

var Endpoint = Model('db', DatabaseSchema);

module.exports = Endpoint;
