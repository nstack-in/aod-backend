var jwt = require('jsonwebtoken');

function authCheck(req, res, next) {
    let token = req.headers['token'];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env['JWT_SECRET']);
    } catch{
        res.json({ message: "invalid token" });
    }
    req.headers['user'] = decoded;
    next();
}
module.exports = authCheck;