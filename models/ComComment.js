const mongoose = require('mongoose');
const ComCommentSchema = mongoose.Schema({
  comment: String,
  userId: Number,
  locationId: String,
  time: {type:Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'ComUser'}
});

const ComComment = mongoose.model('ComComment', ComCommentSchema, 'ComComments');
module.exports = ComComment;
