const express = require('express');
const { v1Route, rootRoute } = require('./routes');
const app = express();


app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        server: 'gws',
        eTag: ''
    })
    next();
})

app.use(function (req, res, next) {
    req.start = Date.now();
    res.on("finish", () => {
        console.log("%s : %fms", req.path, Date.now() - req.start);
    });
    next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

app.use('/', rootRoute);
app.use('/v1', v1Route);


module.exports = app