//Frontend > src > services > index.js
//Axios calls 'actions' to backend
//User: is-logged-in, signUp, logIn, logOut
//Recipe: allRecipes, findOne, udpate, create, delete
//Comment: get all comments for a recipe, create, update, delete, get user comments, find a comment
//Profile:
//These action calls to Backend > (app.js) > routes 


import axios from 'axios';

let baseURL;

process.env.NODE_ENV === 'production'
  //? (baseURL = 'here should be your production endpoint')
  ? (baseURL = 'https://new-applicatio.herokuapp.com')
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  //auth routes for user actions
  //Checks to see if user logged in still
  isLoggedIn: async () => {
    return await service.get('/auth/is-logged-in')
  },
  //Signs up user
  signUp: async (user) => {
    return await service.post('/auth/signup', user)
  },
  //Logs user in
  logIn: async (user) => {
    return await service.post('/auth/login', user)
  },
  //Logs user out
  logOut: async () => {
    return await service.get('/auth/logout')
  },
  
  //recipe actions
  //get all recipes
  allRecipes: async () => {
    return await service.get('/recipe/allrecipes')
  },
  //create new recipe
  newRecipe: async (recipe) => {
    return await service.post('/recipe/new', recipe)
  },
  //update existing recipe
  updateRecipe: async (recipe) => {
    return await service.post('/recipe/update', recipe)
  },
  
  //find a recipe and show details
  findRecipeID: async (recipe) => {
    return await service.get(`/recipe/allrecipes/${recipe}`)
  },
  // //find a recipe and show details
  // findRecipeName: async (recipe) => {
  //   console.log(recipe)
  //   await service.get('/recipe/findRecipe',recipe)
    
  //   return await service.post('/recipe/new',recipe)

  // },
  //delete a recipe
  deleteRecipe: async (recipe) => {
    return await service.post('/recipe/delete', recipe)
  },
  
  //comment actions
  //get all comments for a recipe
  getRecipeComments: async (recipeID) => {
    return await service.get (`/comment/comment/${recipeID}`)
  },
  //get the users comments
  getUserComments: async (userID) => {
    return await service.get (`/comment/comment/${userID}`)
  },
  //add new comments
  newComment: async (comment) => {
    return await service.post('/comment/new', comment)
  },
  //delete a comment
  deleteComment: async (comment) => {
    return await service.post('/comment/delete', comment)
  },
  //find a comment and show details
  findComment: async (comment) => {
    return await service.get(`/comment/${comment}`)
  },
  //update a comment 
  updateComment: async (comment) => {
    return await service.post('/comment/update', comment)
  },
  
  //Profile actions
  //get profile for user signed in
  getProfile: async (userID) => {
    return await service.get (`/profile/profile/${userID}`)
  },
  //add new Profile
  newProfile: async (profile) => {
    return await service.post('/profile/new', profile)
  },
  //delete a Profile
  deleteProfile: async (profile) => {
    return await service.post('/profile/delete', profile)
  },
  //find a profile comments
  findProfileComments: async (profile) => {
    return await service.get(`/profile/myComments`, profile)
  },
  //update profile
  updateProfile: async (profileUpdate) => {
    return await service.post('/profile/update', profileUpdate)
  },
  //find recipes saved to profile
  findProfileRecipes: async () => {
    return await service.get('/profile/myRecipes')
  },
   //add recipe to profile
   addProfileRecipes: async (recipeID) => {
    return await service.post('/profile/myRecipes/addRecipe', recipeID)
  },
   //delete recipe from profile
   deleteProfileRecipes: async (recipeID) => {
    return await service.post('/profile/myRecipes/deleteRecipe', recipeID)
  },
  //find recipes in activity for profile
  findActivityRecipes: async (userID) => {
    return await service.get('/profile/myActivity', userID)
  },
   //add recipe to profile
  addActivityRecipes: async (recipeTitle) => {
    return await service.post('/profile/myActivity/addActivity', recipeTitle)
  },
  
};

export default actions;
