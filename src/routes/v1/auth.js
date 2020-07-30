const userRoutes = require('express').Router();
const { login, forget, register, verify } = require('../../controllers/auth');
const authMiddleware = require('../../middleware/auth');

userRoutes.get('/', function (req, res) {
    res.status(200).json({
        "status": "This is auth routes",
        "response_time": Date.now() - req.start,
    })
});

userRoutes.post('/login', login);

userRoutes.post('/register', register);

userRoutes.get('/verify', [authMiddleware,verify]);
userRoutes.post('/verify', [authMiddleware,verify]);

module.exports = userRoutes;