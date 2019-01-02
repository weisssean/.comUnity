const mongoose = require('mongoose');
const ComImageSchema = {
  description: String,
  userId: Number,
  locationId: String,
  imageUrl: String,
  time: Date
};

const ComImage = mongoose.model('ComImage', ComImageSchema, 'ComImages');
module.exports = ComImage;
