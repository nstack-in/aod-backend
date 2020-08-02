const express = require('express');
const { v1Route, rootRoute } = require('./routes');
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

const jsonErrorHandler = async (err, req, res, next) => {
    return res.status(500).json({
        message: "Invalid JSON format",
        error: {
            status: true,
            message: 'Please verify your json format'
        }
    })
}

app.use(jsonErrorHandler)
app.use((req, res, next) => {

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization,token',
        server: 'gws',
        eTag: ''
    })
    let allowed = ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'];

    if (allowed.indexOf(req.method) < 0) {
        return res.status(301).json({
            message: 'requested method not allowed',
            error: {
                status: true,
                status: `${req.method} method is not allowed`,
            }
        });
    } else if (req.method == "GET" || req.method == "DELETE") {
        return next();
    } else if (req.headers['content-type'] == "application/json") {
        return next();
    } else {
        return res.status(303).json({
            message: "header must container 'content-type' value as 'application/json",
            error: {
                status: true,
                message: ''
            }
        })
    }
})

app.use(function (req, res, next) {
    req.start = Date.now();
    res.on("finish", () => {
        console.log("%s : %fms", req.path, Date.now() - req.start);
    });
    next();
});


app.use('/', rootRoute);
app.use('/v1', v1Route);


module.exports = app