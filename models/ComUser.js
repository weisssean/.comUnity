const mongoose = require('mongoose');
const ComUserSchema = mongoose.Schema({
  provider: String,
  displayName: String,
  name: {familyName: String, givenName: String},
  language: String,
  email: String,
  photos: [String],
  lastLogin: Date
});

const ComUser = mongoose.model('ComUser', ComUserSchema, 'ComUsers');
module.exports = ComUser;
