var jwt = require('jsonwebtoken');

function authCheck(req, res, next) {
    let token = req.headers['token'] || req.headers['Authorization'];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env['JWT_SECRET']);
    } catch{
        res.status(401).json({
            message: "invalid token", data: [], error: {
                message: "Token Expired",
                code: 78,
                status: true,
            }
        });
    }
    req.headers['user'] = decoded;
    next();
}
module.exports = authCheck;