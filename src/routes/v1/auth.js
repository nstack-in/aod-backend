const userRoutes = require('express').Router();
const auth = require('../../controllers/auth');
const authMiddleware = require('../../middleware/auth');

userRoutes.all('/', function (req, res) {
    res.status(200).json({
        "status": "This is auth routes",
        "response_time": Date.now() - req.start,
    })
});

userRoutes.post('/login', auth.login);
userRoutes.post('/register', auth.register);

userRoutes.get('/verify', [authMiddleware, auth.verify]);
userRoutes.post('/verify', [authMiddleware, auth.verify]);

module.exports = userRoutes;