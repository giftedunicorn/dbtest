require('dotenv').config();
const debug = require('debug')(`${process.env.APPNAME}:index`);
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sequelize = require('./mysqlSequelize/sequelize.js');
const server = require('http').Server(app);
const mongodbRoutes = require('./mongodb/routes.js');
const mysqlSequelizeRoutes = require('./mysqlSequelize/routes.js');

// setup mongodb
mongoose.connect(process.env.MONGO_URL);
mongoose.set('debug', true);

// Sync all models that are not already in the database
sequelize.sync()
// force to drop tables before create tables.
// sequelize.sync({force: true});

// test connection to sequelize database
sequelize.authenticate()
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
mongodbRoutes(app)
mysqlSequelizeRoutes(app)

const port = process.env.PORT || 5000;
server.listen(port, () => {
  debug(`${process.env.APPNAME} is running on port: ${port}`);
});
