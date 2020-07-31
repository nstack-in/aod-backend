const DatabaseModel = require('../../../models/database');
const Endpoint = require('../../../models/endpoint');

async function insert(req, res) {
    let data = [];
    let statusCode = 200;
    let error = {
        status: false,
        message: null,
        code: 00,
    };

    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;

    let endpoint = await Endpoint.findOne({
        endpoint_id, __project__: project_id
    });


    if (endpoint) {
        let verification = verifyData(endpoint, req.body);
        if (verification.err.status) {
            statusCode = 403;
            error = verification.err;
            data = null;
        } else {
            statusCode = 201;
            verification.data.__endpoint__ = endpoint.id;
            verification.data.__project__ = project_id;
            data = await DatabaseModel(verification.data).save();
        }
    } else if (!endpoint) {
        statusCode = 201;
        error = {
            status: true,
            message: 'Invalid Endpoint',
            code: 07,
        };
    } else if (!data) {
        statusCode = 201;
        error = {
            status: true,
            message: 'Could Not insert',
            code: 012,
        };
    }
    if (data) {
        data = data._doc
        delete data['__endpoint__']
        delete data['__project__']
    }
    return res.status(statusCode).json({
        message: "Data Inserted",
        server_response_time: `${(Date.now() - req.start)}ms`,
        data: data,
        error: error
    });

}


function verifyData(endpoint, requested_data) {
    let data = {};
    let error = {};
    if (endpoint.structured) {
        let override = false;
        let fields = [];
        let struct = endpoint.models;

        struct.forEach(element => {
            let capture = requested_data[element['name']];
            if (capture == null) {
                fields.push(element['name'])
                override = true;
            } else {
                data[element['name']] = capture;
            }
        });
        if (override)
            error = {
                status: true,
                message: `Please fill required field: ${fields.join(', ')} `,
                code: 18,
            }; else error = {
                status: false,
                message: '',
                code: 0,
            };
    } else {
        data = requested_data;
        error = {
            status: false,
            message: null,
            code: 0,
        }
    }

    return { err: error, data: data };

}

module.exports = insert;