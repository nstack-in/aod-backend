const v1Routes = require('express').Router();
const authRoutes = require('./auth');
const projectRoutes = require('./project');
const databaseRoutes = require('./database');

const authMiddleware = require('../../middleware/auth');
global.version = 1;
v1Routes.get('/', function (req, res) {
    res.status(200).json({
        "response_time": Date.now() - req.start,
        "message": "This is current version",
        "status": "Live",
        "created_on": "1st August 2020",
    });
})

v1Routes.use('/auth', authRoutes);
v1Routes.use('/project', [authMiddleware, projectRoutes]);
v1Routes.use('/api', databaseRoutes);

module.exports = v1Routes;