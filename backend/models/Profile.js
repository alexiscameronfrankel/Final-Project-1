const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    UserID: {type:String},
    username: {type: String, required: true},
    firstName: { type: String, required: true}, 
    lastName: { type: String, required: true },
    image: { type: String, default:'/images/defaultAvatar.png'},
    dietPreference: {type: Array, enum: ['Vegetarian', 'Vegan', 'Gluten Free', 'Diary-Free','Pregnancy Friendly']},
    allergies: {type: Array},//or String
    recipes: {type: Array},
    activity: {type: Array}, //will include past reviews on recipes
  });
  
  
  const Profile = mongoose.model('Profile', ProfileSchema);
  module.exports = Profile;