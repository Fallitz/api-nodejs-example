require("dotenv").config();

module.exports = {
  development:{
    debug: true,
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port: process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/config/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/config/migrations/seeds`
    }
  },
  production:{
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port: process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/config/migrations`
    }
  }
};