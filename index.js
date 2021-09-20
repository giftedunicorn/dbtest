require('dotenv').config();
const debug = require('debug')(`${process.env.APPNAME}:index`);
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = require('http').Server(app);

const getUser = require('./getUser');
const createUser = require('./createUser');
const updateUser = require('./updateUser');

// setup mongodb
mongoose.connect(process.env.MONGO_URL);
mongoose.set('debug', true);

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/user', getUser)
app.post('/api/user', createUser)
app.put('/api/user', updateUser)

const port = process.env.PORT || 5000;
server.listen(port, () => {
  debug(`${process.env.APPNAME} is running on port: ${port}`);
});
