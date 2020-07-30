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
            type: Schema.Types.ObjectId,
            ref: "Endpoint",
            required: true,
            select: false,
        },
    },
    {
        versionKey: false,
        timestamps: false, strict: false,
    }
);

DatabaseSchema.index({ __project__: 1, __endpoint__: 1 });

var Database = Model('Database', DatabaseSchema);

module.exports = Database;
