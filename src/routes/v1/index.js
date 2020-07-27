const v1Routes = require('express').Router();
const userRoutes = require('./auth');

v1Routes.get('/', function (req, res) {
    res.status(200).json({
        "response_time": Date.now() - req.start,
        "message": "This is current version",
        "status": "Live",
        "created_on": "1st August 2020",
    });
})

v1Routes.use('/auth', userRoutes);

module.exports = v1Routes;