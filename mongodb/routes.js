const getUser = require('./getUser');
const createUser = require('./createUser');
const updateUser = require('./updateUser');

function routeGenerator(app) {
  app.get('/api/mongodb/user', getUser)
  app.post('/api/mongodb/user', createUser)
  app.put('/api/mongodb/user', updateUser)
}

module.exports = routeGenerator;
