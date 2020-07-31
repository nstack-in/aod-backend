const DatabaseModel = require('../../../models/database');
const Endpoint = require('../../../models/endpoint');

async function list(req, res) {

    let project_id = req.params.pid;
    let endpoint_id = req.params.eid;
    let page = parseInt(req.query.page, 10) || 0;
    let resultsPerPage = parseInt(req.query.perpage, 10) || 10;

    resultsPerPage = resultsPerPage < 25 ? resultsPerPage : 25;

    let filter = {}
    filter.__project__ = project_id;

    let endpoint = await Endpoint.findOne({ endpoint_id, __project__: project_id });
    let data = [];
    let statusCode = 200;
    let error = {
        status: false,
        message: '',
        code: 00,
    };
    if (endpoint) {
        data = await DatabaseModel
            .find(filter)
            .limit(resultsPerPage)
            .skip(resultsPerPage * page);
    } else if (!endpoint) {
        statusCode = 402;
        error = {
            status: true,
            message: 'Invalid Endpoint',
            code: 07,
        }
    } else if (!data) {
        statusCode = 403;
        error = {
            status: true,
            message: 'No Data found',
            code: 07,
        }
    }
    return res.status(statusCode).json({
        response_time: `${(Date.now() - req.start)}ms`,
        message: "GET LIST OF DATA",
        data: data,
        error: error,
    });

}

module.exports = list;