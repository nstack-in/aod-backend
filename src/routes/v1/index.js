const v1Routes = require('express').Router();
const authRoutes = require('./auth');
const projectRoutes = require('./project');
const databaseRoutes = require('./database');

const authMiddleware = require('../../middleware/auth');
global.version = 1;

v1Routes.use('/auth', authRoutes);
v1Routes.use('/project', [authMiddleware, projectRoutes]);
v1Routes.use('/api', databaseRoutes);

module.exports = v1Routes;