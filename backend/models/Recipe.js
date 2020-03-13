const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    
    title: { type: String, required: true},
    category: { type: String, enum: ['Vegetarian', 'Vegan','Pork','Chicken','Beef','Seafood','Other'], required: true },
    dishtype: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    cuisine: { type: String},
    instructions: {type: String, required: true},
    image: {type: String, default:' https://images.media-allrecipes.com/images/75131.jpg'},
    tags: {type: Array},
    video: {type: String},
    ingredient1: {type: Array, required: true},
    ingredient2: {type: String},
    ingredient3: {type: String},
    ingredient4: {type: String},
    ingredient5: {type: String},
    ingredient6: {type: String},
    ingredient7: {type: String},
    ingredient8: {type: String},
    ingredient9: {type: String},
    ingredient10: {type: String},
    ingredient11: {type: String},
    ingredient12: {type: String},
    ingredient13: {type: String},
    ingredient14: {type: String},
    ingredient15: {type: String},
    ingredient16: {type: String},
    ingredient17: {type: String},
    ingredient18: {type: String},
    ingredient19: {type: String},
    ingredient20: {type: String},
    measurement1: {type: String},
    measurement2: {type: String},
    measurement3: {type: String},
    measurement4: {type: String},
    measurement5: {type: String},
    measurement6: {type: String},
    measurement7: {type: String},
    measurement8: {type: String},
    measurement9: {type: String},
    measurement10: {type: String},
    measurement11: {type: String},
    measurement12: {type: String},
    measurement13: {type: String},
    measurement14: {type: String},
    measurement15: {type: String},
    measurement16: {type: String},
    measurement17: {type: String},
    measurement18: {type: String},
    measurement19: {type: String},
    measurement20: {type: String},
    profileID: {type: String},
    created: {type:Date, default: Date.now},
    comments: {type: Array}
  
  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;