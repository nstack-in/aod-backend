const User = require('../../models/auth/user');

function register(req, res) {
    User(req.body).save(function (err, data) {
        if (err) {
            res.status(200).json({
                "response_time": Date.now() - req.start,
                "message": "Error",
                "data": [],
                "error": err.message,
            });
        } else {
            res.status(200).json(
                {
                    "response_time": Date.now() - req.start,
                    "status": "User Created Successfully",
                    "data": data,
                    "error": [],
                }
            );
        }
    })

}

function verify(req, res) {

    res.status(200).json({
        "response_time": Date.now() - req.start,
        "status": "working",
    })
}

function login(req, res) {

    res.status(200).json({
        "status": "working",
        "response_time": Date.now() - req.start
    })
}

function forget(req, res) {

    res.status(200).json({
        "status": "working",
        "response_time": Date.now() - req.start
    })
}

module.exports = {
    login,
    register,
    forget,
    verify,
}