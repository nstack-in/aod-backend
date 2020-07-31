const find = require('./find');
const list = require('./list');
const insert = require('./insert');
const update = require('./update');
const remove = require('./remove');


module.exports = {
    insertDataController: insert,
    getDataController: list,
    removeDataController: remove,
    updateDataController: update,
    findDataController: find
}