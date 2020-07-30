const crypto = require('crypto');
var jwt = require('jsonwebtoken');

const UserModel = require('../../models/auth/user');

function register(req, res) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;

    UserModel(req.body).save(function (err, data) {
        if (err) {
            res.status(400).json({
                response_time: `${Date.now() - req.start}ms`,
                "message": "Error",
                "data": [],
                "error": {
                    status: true,
                    message: err.message
                },
            });
        } else {
            res.status(200).json(
                {
                    response_time: `${Date.now() - req.start}ms`,
                    "status": "User Created Successfully",
                    "data": data,
                    "error": {
                        status: false,
                        message: ""
                    },
                }
            );
        }
    })

}

function verify(req, res) {
    res.status(200).json({
        response_time: `${Date.now() - req.start}ms`,
        data: req.headers['user']['data'],
        "error": {
            status: false,
            message: ""
        },
    })
}

function login(req, res) {
    UserModel.find({ email: req.body.email })
        .then((user, err) => {
            if (!user[0]) {
                res.status(404).json({
                    response_time: `${Date.now() - req.start}ms`,
                    "message": "User Not Found",
                    "data": [],
                    "error": err,
                });
            } else {
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {

                    token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: {
                            id: user[0].id,
                            name: user[0].name,
                            email: user[0].email,
                        }
                    }, process.env['JWT_SECRET']);
                    return res.status(200).json({
                        message: "User Authenticated",
                        token: token,
                        data: user[0]
                    });
                } else {
                    return res.status(400).send({
                        errors: ['Invalid email or password'],
                        data: user,
                    });
                }
            }
        });
}

function forget(req, res) {

    res.status(200).json({
        "status": "working",
        response_time: `${Date.now() - req.start}ms`
    })
}

module.exports = {
    login,
    register,
    forget,
    verify,
}