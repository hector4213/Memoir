/* The db connection*/
const { Model } = require('objection')
const Knex = require('knex')

const environment = process.env.NODE_ENV || 'development'

const knexConfig = require('../knexfile')
const connectionConfig = knexConfig[environment]

const knex = Knex(connectionConfig)
// Give the knex object to objection.
Model.knex(knex)
module.exports = {
  knex,
  Model,
}
