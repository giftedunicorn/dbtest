const debug = require('debug')(`${process.env.APPNAME}:createUser`);
const User = require('./models/user');

async function createUser(req, res, next) {
  debug('createUser INVOKED', req.body, req.ip);
  let { email, name, provider_uid, provider, avatar } = req.body;

  try {
    if (!email) throw new Error('Email is missing');
    email = email.trim()
    email = email.toLowerCase()

    // Check if user already exists, send error if they do
    let user = await User.findOne({ email });
    if (user) throw new Error('Email is taken');

    user = new User({
      email: email,
      name: name,
      provider_uid: provider_uid,
      provider: provider,
      avatar: avatar,
    });

    user = await user.save();
    debug('createUser DONE');
    return res.status(200).send({data: user});
  } catch (error) {
    debug('createUser ERROR', error);
    return res.status(400).send({message: error.message});
  }
}

module.exports = createUser;
