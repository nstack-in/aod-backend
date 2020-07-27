const userRoutes = require('express').Router();
const { login, forget, register, verify } = require('../../controllers/auth');

userRoutes.get('/', function (req, res) {
    res.status(200).json({
        "status": "This is auth routes",
        "response_time": Date.now() - req.start,
    })
});

userRoutes.post('/login', login);

userRoutes.post('/register', register);

module.exports = userRoutes;