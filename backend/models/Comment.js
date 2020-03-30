const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    recipeID: { type: String},
    profileID:{ type: String},
    username: { type: String},
    rating: { type: String, required: true },
    description: {type: String, required: true},
    avatar: {type: String, default: '/images/defaultAvatar.png'}
  });
  
  
  const Comment = mongoose.model('Comment', CommentSchema);
  module.exports = Comment;