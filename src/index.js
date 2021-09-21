require('dotenv').config();
const debug = require('debug')(`${process.env.APPNAME}:index`);
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysqlSequelize = require('./mysql/sequelize.js');
const postgresqlSequelize = require('./postgresql/sequelize.js');

// setup mongodb
mongoose.connect(process.env.MONGO_URL);
mongoose.set('debug', true);

// Sync all models that are not already in the database
mysqlSequelize.sync()
// force to drop tables before create tables.
// mysqlSequelize.sync({force: true});

// test connection to sequelize database
mysqlSequelize.authenticate()
.then(() => {
	console.info('INFO - Database connected.')
})
.catch(err => {
  console.log('Unable to connect to the database:');
  console.log(error.message);
  process.exit(1);
})

// Sync all models that are not already in the database
postgresqlSequelize.sync()
// force to drop tables before create tables.
// postgresqlSequelize.sync({force: true});

// test connection to sequelize database
postgresqlSequelize.authenticate()
.then(() => {
	console.info('INFO - Database connected.')
})
.catch(err => {
  console.log('Unable to connect to the database:');
  console.log(error.message);
  process.exit(1);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// setup routes
const mongodbRoutes = require('./mongodb/routes.js');
const mysqlSequelizeRoutes = require('./mysql/routes.js');
const postgresqlSequelizeRoutes = require('./postgresql/routes.js');
mongodbRoutes(app)
mysqlSequelizeRoutes(app, 'mysql')
postgresqlSequelizeRoutes(app, 'postgresql')

const port = process.env.PORT || 5000;
server.listen(port, () => {
  debug(`${process.env.APPNAME} is running on port: ${port}`);
});
