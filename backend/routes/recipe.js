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


// 1) Get all recipes from database
router.get('/allrecipes', (req, res, next) => {   
    Recipe.find()
    .then(allRecipesFoundInDb => {
        res.send(allRecipesFoundInDb)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});



// 2) get specific recipe
router.get('/recipe/:recipeID', (req, res, next) => {
    //Example: Recipe.findById('245245234hgryh35635')
    //Example: Recipe.findOne({name:'linguine', _id:'2452', date:'yesterday', likes:10})
    req.query
    Recipe.findOne({name:req.params.recipeID})
    .then(recipeFound => {
        res.send(recipeFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

// 3) Update recipe if user created it
router.post('/update', (req, res, next) => {
    let recipeUserID=req.body.userID
    if(recipeUserID===req.user._id){
        Recipe.updateOne(req.body)
        .then(recipeUpdated => res.send('Recipe updated',recipeUpdated))
        .catch(console.log('An error occured'));
    } else {
        res.json({errorMessage: "Only creator of recipe can update"})
    }
});

// 4) delete recipe if user created it
router.post('/delete',isAuth, (req, res, next) => {
    let recipeUserID=req.body.userID
    if(recipeUserID===req.user._id){
        Recipe.deleteOne(req.body)
        .then(recipeDeleted => res.send('Successfully deleted',recipeDeleted))
        .catch(console.log('An error occured'));
    } else {
        res.json({errorMessage: "Only creator of recipe can delete"})
    }
});

// 5) Create new Recipe
router.post('/new',isAuth, (req, res, next) => {
    console.log(req.body)
    let newRecipe=req.body
    newRecipe.profileID=req.user._id
    Recipe.create(newRecipe)
    .then(recipeCreated => res.send(recipeCreated))
    .catch(err => console.log(err))
});

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
