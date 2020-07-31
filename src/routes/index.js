const rootRoute = require('express').Router();
const v1Routes = require('./v1');


rootRoute.get('/', function (req, res) {
    res.status(200).json({
        'message': "This is api generator endpoint",
        "developer": "Nitish Kumar Singh <nitishk72@gmail.com>",
        "website": "https://www.nstack.in"
    });
});

rootRoute.get('/health', function (req, res) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({
        'message': "API looks good",
        "ip": `IP : ${ip}`,
    });
});

module.exports = {
    v1Route: v1Routes,
    rootRoute: rootRoute,
};