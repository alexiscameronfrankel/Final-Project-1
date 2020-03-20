//Recipe routes that execute CRUD
//Recipe imported is from Recipe model file and communicates with mongoDB compass to run methods
//req is the state object from the frontend component that gets passed through in the axios call 
//res is the response to the front end
// 1) Get all recipes from database
// 2) Get specific recipe
// 3) Update recipe if user created it
// 4) Delete recipe if user created it
// 5) Create new Recipe


const router = require('express').Router();
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const Profile = require('../models/Profile');


// 1) Get all recipes from database
router.get('/allrecipes', (req, res, next) => {   
    Recipe.find()
    .then(allRecipesFoundInDb => {
        console.log('all recipes from backend',allRecipesFoundInDb)
        res.send(allRecipesFoundInDb)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});



// 2) get specific recipe
router.get('/allrecipes/:recipeID', (req, res, next) => {
    //Example: Recipe.findById('245245234hgryh35635')
    //Example: Recipe.findOne({name:'linguine', _id:'2452', date:'yesterday', likes:10})
    // req.query
    console.log(req.query)
    Recipe.findOne({_id:req.params.recipeID})
    .then(recipeFound => {
        res.send(recipeFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

// 3) Update recipe if user created it
router.post('/update', (req, res, next) => {
    let recipeUserID=req.body.profileID
    Profile.find({UserID:req.user._id})
    .then(profile=>{
        if(recipeUserID===profile._id){
            Recipe.updateOne({_id: req.body._id},req.body)
            .then(recipeUpdated => res.send('Recipe updated',recipeUpdated))
            .catch(console.log('An error occured'));
        }    
    })
    .catch(console.log('An error occured'));
});

// 4) delete recipe if user created it
router.post('/delete',isAuth, (req, res, next) => {
    let recipeUserID=req.body.profileID
    Profile.find({UserID:req.user._id})
    .then(profile=>{
        if(recipeUserID===profile._id){
            Recipe.deleteOne({_id: req.body._id})
            .then(recipeDeleted => res.send('Successfully deleted',recipeDeleted))
            .catch(console.log('An error occured'));
        }
    })
    .catch(console.log('An error occured'));
});

// 5) Create new Recipe 
router.post('/new',isAuth, (req, res, next) => {
    console.log('inside create new recipe',req.body)
    let duplicateRecipe=0
    Recipe.find({title:req.body.title})
    .then(RecipeFound=> {
        console.log('RecipeFound',RecipeFound)
        if (RecipeFound.length>0){duplicateRecipe=1}
        if (duplicateRecipe<1){
            Recipe.create(req.body)
            .then(recipeCreated => res.send(console.log('recipe created because it dont exist',recipeCreated)))
            .catch(err => console.log(err))
        }
        console.log('duplicateRecipe',duplicateRecipe)
        res.send(RecipeFound)
    })
    .catch(error => {
        console.log('recipe already exist',error)
    })
        
});

// 6) find recipe by name
router.get('/findRecipe', (req, res, next) => {
    //Example: Recipe.findById('245245234hgryh35635')
    //Example: Recipe.findOne({name:'linguine', _id:'2452', date:'yesterday', likes:10})
    console.log(req.query)
    Recipe.findOne({title:req.body.title})
    .then(recipeFound => {
        res.send(recipeFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

// 7) find recipe comments
router.get('/:recipeID/comments', (req, res, next) => {
    //Example: Recipe.findById('245245234hgryh35635')
    //Example: Recipe.findOne({name:'linguine', _id:'2452', date:'yesterday', likes:10})
    console.log(req.query)
    Comment.find({ recipeID: req.params.recipeID })
    .then(recipeFound => {
        console.log(recipeFound)
        res.send(recipeFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
