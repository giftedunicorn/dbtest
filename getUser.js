const debug = require('debug')(`${process.env.APPNAME}:getUser`);
const User = require('./mongodb/user');

async function getUser(req, res) {
  debug('getUser INVOKED', req.query, req.ip);
  let { email } = req.query;

  try {
    // populate query baseud on query of id and email
    if (!email) throw new Error('User is not found');
    email = email.trim()
    email = email.toLowerCase()

    // get user and subscriptions
    let user = await User.findOne({ email });
    if (!user) throw new Error('User is not found');

    debug('getUser DONE');
    return res.status(200).send({data: user});
  } catch (error) {
    debug('getUser ERROR', error);
    return res.status(400).send({message: error.message});
  }
}

module.exports = getUser;
