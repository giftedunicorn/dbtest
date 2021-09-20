const debug = require('debug')(`${process.env.APPNAME}:updateUser`);
const User = require('./mongodb/user');

async function updateUser(req, res, next) {
  debug('updateUser INVOKED', req.body, req.ip);
  let { email, name, provider_uid, provider, avatar } = req.body;

  try {


    debug('updateUser DONE');
    return res.status(200).send({});
  } catch (error) {
    debug('updateUser ERROR', error);
    return res.status(400).send({message: error.message});
  }
}

module.exports = updateUser;
