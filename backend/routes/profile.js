//Profile routes that execute CRUD
//Profile imported is from Profile model file and communicates with mongoDB compass to run methods
//Recipe imported is from Recipe model file and communicates with mongoDB compass to run methods
//req is the state object from the frontend component that gets passed through in the axios call 
//res is the response to the front end
//Additional routes to add recipes to profile, as well as save, update, delete recipes from those in profile
// 1) Find user profile
// 2) Create Profile
// 3) Update Profile if authorized
// 4) Delete profile if authorized
// 5) Get all recipes saved by user from database
// 6) add recipes to profile. State passed needs to include recipesArray associated with user and recipeID
// 7) delete recipes in profile. State passed needs to include recipesArray associated with user and recipeID


const router = require('express').Router();
const Profile = require('../models/Profile');
const Recipe = require('../models/Recipe');

// 1) Find user profile
router.get('/',isAuth, (req, res, next) => {   
    Profile.find({userID:`${req.user._id}`})
    .then(profileFound => {
        res.send(profileFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

// 2) Create profile
router.post('/new',isAuth, (req, res, next) => {
    let profile=req.body
    profile.UserID = req.user._id
    Profile.create(profile)
    .then(profileCreated => res.send(profileCreated))
    .catch(err => console.log(err))
});


// 3) Update profile if authorized 
router.post('/update',isAuth, (req, res, next) => {
    let profileUserID=req.body.userID
    if(profileUserID===req.user._id){
        Profile.updateOne(req.body)
            .then(profileUpdated => res.send('profile updated',profileUpdated))
            .catch(console.log('An error occured'));
    } else {
        res.json({errorMessage: "Only creator of comment can delete"})
    }
});

// 4) Delete profile if authorized 
router.post('/delete',isAuth, (req, res, next) => {
    let profileUserID=req.body.userID
    if(profileUserID===req.user._id){
        Profile.deleteOne(req.body)
            .then(profileDeleted => res.send('Successfully deleted',profileDeleted))
            .catch(console.log('An error occured'));
    } else {
        res.json({errorMessage: "Only creator of comment can delete"})
    }
});

// 5) Get all recipes saved by user from database
router.get('/myRecipes',isAuth, (req, res, next) => {
    let myProfileUserID=req.body
    let recipesFound=[]
    Profile.find({UseerID:myProfileUserID})
    .then(profile => {
        let profileRecipes=profile.recipes
        res.send(profileRecipes)
        // profileRecipes.forEach(recipeID => {
        // Recipe.find(recipeID)
        // .then(recipeFoundInDb => {
        //     recipesFound.push(recipeFoundInDb)
        // })
        // });
        // res.send(recipesFound)
        // .catch(err => console.log(err))
    })
    .catch(error=>console.log(error))
//   res.status(200).json({ msg: 'Working' });
});

// 6) add recipes to profile. State passed needs to include recipesArray associated with user and recipeID
router.get('/myRecipes/addRecipe',isAuth, (req, res, next) => {
    // let recipeAdded = [...req.body.recipesArray]
    // recipeAdded.push(req.body.saveRecipe)
    let profile=req.body
    let userFound=false
    console.log('req.user.id in myrecipes', profile.UserID)
    Profile.find({UserID: profile.UserID})
    .then(user=> {
        userFound=true
        console.log('user found',user)
        res.send('Successfully found',user)})
    .catch(console.log("An error has occurred."))
    // if (userFound){
     profile.recipes
    // Profile.update({UserID:`${req.user._id}`},{recipes: `${recipeAdded}` })
    // .then(user=> res.send('Successfully added',user))
    // .catch(console.log("An error has occurred."))}
});

// 7) delete recipes in profile. State passed needs to include recipesArray associated with user and recipeID
router.get('/myRecipes/addRecipe',isAuth, (req, res, next) => {
    let recipeAdded = [...req.body.recipesArray]
    recipeAdded.filter(eachRecipe=>{
        return !(eachRecipe===req.body.deleteRecipeID)
    })
    Profile.update({UserID:`${req.user._id}`},{recipes: `${recipeAdded}` })
    .then(user=> res.send('Successfully added',user))
    .catch(console.log("An error has occurred."))

});

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}
  
module.exports = router;