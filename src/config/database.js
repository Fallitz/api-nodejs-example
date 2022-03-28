const options = require('./knexfile')
const knex = require('knex')(options[process.env.NODE_ENV]);

module.exports = knex