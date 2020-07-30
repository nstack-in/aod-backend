const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        verification: {
            type: String
        },
        type: {
            type: String,
            default: "FREE",
        },
        shared: [{
            id: String,
            level: Number,
        }]
    },
    {
        timestamps: true
    }
);

var User = Model('User', UserSchema);


UserSchema.path('email').validate(async (value) => {
    const emailCount = await User.countDocuments({ email: value });
    return !emailCount;
}, 'Email already exists');

module.exports = User;
