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
const Comment = require('../models/Comment');

// 1) Find user profile
router.get('/profile/:profileID',isAuth, (req, res, next) => {   
    console.log('reqbodyinprofileget',req.body)
    Profile.find({UserID: req.user._id})
    .then(profileFound => {
        console.log(profileFound, "TEST")
        res.send(profileFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

// 2) Create profile
router.post('/new', (req, res, next) => {
    let profile=req.body
    Profile.create(profile)
    .then(profileCreated => res.send(profileCreated))
    .catch(err => console.log(err))
});


// 3) Update profile if authorized 
router.post('/update',isAuth, (req, res, next) => {
    console.log('inside profile update route',req.body)
    Profile.updateOne({UserID : req.user._id},{$set: req.body})
        .then(profileUpdated => console.log(profileUpdated))
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
    // let myProfileUserID= req.user._id
    console.log(req.body,req.body._id)
    let myProfileUserID= req.body._id
    Profile.find({UserID:myProfileUserID})
    .then(profile => {
        let profileRecipes=[...profile[0].recipes]
        
            Recipe.find( { _id: { $in: profileRecipes } } )
            .then(recipesFoundInDb => {
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
    console.log('reqbody in myrecipes ADD', req.body)
    Recipe.findOne({title: req.body.title}).then(recipeFound=>{
        let saveRecipeID=recipeFound._id
        console.log('recipe saved',saveRecipeID)
        Profile.updateOne({UserID:myProfileUserID},{ $addToSet: { recipes: [saveRecipeID] } })
            .then(savedRecicpes=> res.send(console.log("successfully added", savedRecicpes)))
            .catch(err => console.log(err))  
            })
            .catch(console.log("An error has occurred."))
    })
    

// 7) delete recipes in profile. State passed needs to include recipesArray associated with user and recipeID
router.post('/myRecipes/deleteRecipe',isAuth, (req, res, next) => {
    let myProfileUserID= req.user._id
    console.log('req.user.id in myrecipes', myProfileUserID)
    Profile.find({UserID: myProfileUserID})
    .then(profile => {
        console.log(profile)
        let profileRecipes=[...profile[0].recipes]
        Recipe.deleteOne({title:req.body.title})
            .then(recipedeleted=>{
            
            console.log("successfully deleted", recipedeleted)
            })
            .catch(console.log("An error has occurred."))
    })
    .catch(console.log("An error has occurred."))
});

// 8) Get all comments by user from database
router.get('/myComments',isAuth, (req, res, next) => {
    let myUserID= req.user._id
    console.log('reqbody', req.user)

    Profile.find({UserID:myUserID})
    .then(profile => {
           Comment.find( { profileID: profile[0]._id } )
            .then(commentsFoundInDb => {
                console.log(commentsFoundInDb)
                res.json(commentsFoundInDb)
            })
            .catch(err => console.log(err))
    })
    .catch(error=>console.log(error))
//   res.status(200).json({ msg: 'Working' });
});

// 9) Get all recipes visited by user
router.get('/myActivity',isAuth, (req, res, next) => {
    let myProfileUserID= req.user._id
    Profile.find({UserID:myProfileUserID})
    .then(profile => {
        console.log('profile received in activity',profile)
        let profileActivity=[...profile[0].activity]
        console.log('meals in activity1',profileActivity.length)
       
        let arrayOfMeals=[]
        if(profileActivity.length < 10 || profileActivity.length===0){
            let mealsNeeded= 10 - profileActivity.length
            Recipe.find().limit( mealsNeeded ).then(mealsReturned=>{
                // console.log('meals returned to make up difference',mealsReturned)
                arrayOfMeals = [...mealsReturned]
                
                Recipe.find( { _id: { $in: profileActivity } })
                .then(recipesFoundInDb => {
                    recipesFoundInDb.map(eachRecipe=>{
                        arrayOfMeals.push(eachRecipe)
                    })
                    console.log('meals returned to frontend',arrayOfMeals)
                    res.json(arrayOfMeals)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }else{
            let a= profileActivity.slice(-10)
            console.log('meals in activity2',a.length)
            Recipe.find( { _id: { $in: a } })
            .then(recipesFoundInDb => {
                console.log('meals returned to me',recipesFoundInDb)
                res.json(recipesFoundInDb)
            })
            .catch(err => console.log(err))
        }
    })
    .catch(error=>console.log(error))
//   res.status(200).json({ msg: 'Working' });
});

// 10) add activity to profile. State passed needs to include recipesArray associated with user and recipeID
router.post('/myActivity/addActivity',isAuth, (req, res, next) => {
    let myProfileUserID= req.user._id
    // console.log('title passed to myActivity add', req.body)
    Recipe.find(req.body).then(recipeFound=>{
        // console.log("id found",recipeFound)
        let saveRecipeID = `${recipeFound[0]._id}`
        Profile.updateOne({UserID:myProfileUserID},{ $push: { activity: [saveRecipeID], $position: 0 } }).then(savedRecicpes=>{
            console.log("successfully added", savedRecicpes)
            Profile.find({UserID:req.user._id}).then(profile=> console.log('profile activity updated',profile)).catch(err=> console.log(err))
            res.send(savedRecicpes)
            })
            .catch(err => console.log(err))
    })
    .catch(console.log("An error has occurred."))
    
});

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}
  
module.exports = router;