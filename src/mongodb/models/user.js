const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')(`${process.env.APPNAME}:user-model`);
const validateEmail = email => (/\S+@\S+\.\S+/).test(email);

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please enter a valid email'],
  },
  name: { type: String, default: '' },
  lastname: { type: String, default: '' },
  provider_uid: { type: String, default: '' },
  provider: { type: String, default: '' },
  avatar: { type: String, default: '' },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
}, { minimize: false });

module.exports = mongoose.model('user', userSchema);

// FIND ALL // db.getCollection('users').find({})
// TAKE OUT A FIELD // db.getCollection('users').updateMany({},  { $unset: { teachLocation: ""}})
// ADD A FIELD // db.getCollection('users').updateMany({},  { $set: { membership: []}})
// UPDATE MISSING FIELDS // db.getCollection('users').updateMany({membership: null }, { $set: { membership: []}})
// UPDATE FIELD NAME // db.getCollection('users').updateMany({}, {$rename: {experience: "teachSince"}})