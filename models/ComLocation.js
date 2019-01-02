const mongoose = require('mongoose');
const ComLocationSchema = {

  status: Number,
  name: String,
  desc: String,
  type: Number,
  phone: String,
  email: String,
  address: String,
  lat: Number,
  lng: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'ComUser'},
  imageURLs: [String]
};

const ComLocation = mongoose.model('ComLocation', ComLocationSchema, 'ComLocations');
module.exports = ComLocation;
