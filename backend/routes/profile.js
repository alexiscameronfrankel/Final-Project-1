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
router.get('/profile/:profileID',isAuth, (req, res, next) => {   
    console.log('reqbodyinprofileget',req.body)
    Profile.find({UserID: req.user._id})
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
    console.log('inside profile update route',req.body)
    Profile.updateOne({UserID:req.user._id},req.body)
        .then(profileUpdated => res.send(profileUpdated))
        .catch(console.log('An error occured'));
    
});

// 4) Delete profile if authorized 
router.post('/delete',isAuth, (req, res, next) => {
    
        Profile.deleteOne({UserID: req.user._id})
            .then(profileDeleted => res.send('Successfully deleted',profileDeleted))
            .catch(console.log('An error occured'));

});

// 5) Get all recipes saved by user from database
router.get('/myRecipes',isAuth, (req, res, next) => {
    let myProfileUserID= req.user._id
    console.log('reqbody', req.user)

    Profile.find({UserID:myProfileUserID})
    .then(profile => {
        console.log(profile)
        let profileRecipes=[...profile[0].recipes]
        // profileRecipes.forEach(recipeID => {
            Recipe.find( { _id: { $in: profileRecipes } } )
            .then(recipesFoundInDb => {
                // res.send(console.log(recipeFoundInDb))   
                // recipesFound.push(recipeFoundInDb)
                console.log(recipesFoundInDb)
                res.json(recipesFoundInDb)
            })
            .catch(err => console.log(err))
    })
    .catch(error=>console.log(error))
//   res.status(200).json({ msg: 'Working' });
});

// 6) add recipes to profile. State passed needs to include recipesArray associated with user and recipeID
router.post('/myRecipes/addRecipe',isAuth, (req, res, next) => {
    let myProfileUserID= req.user._id
    let addRecipe=req.body
    console.log('req.user.id in myrecipes', myProfileUserID)
    Profile.find({UserID: myProfileUserID})
    .then(profile => {
        console.log(profile)
        let profileRecipes=[...profile[0].recipes]
        profileRecipes.push(addRecipe)
        res.send(console.log("successfully added", addRecipe))
    })
    .catch(console.log("An error has occurred."))
});

// 7) delete recipes in profile. State passed needs to include recipesArray associated with user and recipeID
router.post('/myRecipes/deleteRecipe',isAuth, (req, res, next) => {
    let myProfileUserID= req.user._id
    let deleteRecipeID=req.body
    console.log('req.user.id in myrecipes', myProfileUserID)
    Profile.find({UserID: myProfileUserID})
    .then(profile => {
        console.log(profile)
        let profileRecipes=[...profile[0].recipes]
        profileRecipes.splice(indexOf(deleteRecipeID),1)
        res.send(console.log("successfully deleted", deleteRecipeID))
    })
    .catch(console.log("An error has occurred."))
});

// 8) Get all comments by user from database
router.get('/myActivity',isAuth, (req, res, next) => {
    let myProfileUserID= req.user._id
    console.log('reqbody', req.user)

    Profile.find({UserID:myProfileUserID})
    .then(profile => {
        console.log(profile)
        let profileRecipes=[...profile[0].recipes]
        // profileRecipes.forEach(recipeID => {
            Recipe.find( { _id: { $in: profileRecipes } } )
            .then(recipesFoundInDb => {
                // res.send(console.log(recipeFoundInDb))   
                // recipesFound.push(recipeFoundInDb)
                console.log(recipesFoundInDb)
                res.json(recipesFoundInDb)
            })
            .catch(err => console.log(err))
    })
    .catch(error=>console.log(error))
//   res.status(200).json({ msg: 'Working' });
});

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}
  
module.exports = router;