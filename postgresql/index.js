const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'password',
    database : 'testdb'
  }
});

module.exports = knex;