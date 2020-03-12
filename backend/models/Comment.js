const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    recipeID: { type: String},
    userID:{ type: String},
    title: { type: String},
    rating: { type: String, required: true },
    description: {type: String, required: true},
    image: {type:string}
  });
  
  
  const Comment = mongoose.model('Comment', CommentSchema);
  module.exports = Comment;