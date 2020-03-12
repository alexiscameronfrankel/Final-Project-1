const router = require('express').Router();
const Recipe = require('../models/Recipe');

router.get('/recipe', (req, res, next) => {
    Recipe.find()
    .then(allRecipesFoundInDb => {
        res.send(allRecipesFoundInDb)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

router.get('/recipe/findOne', (req, res, next) => {
    Recipe.findOne(req.body)
    .then(recipeFound => {
        res.send(recipeFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

router.post('/recipe/update', (req, res, next) => {
  Recipe.updateOne(req.body)
    .then(recipeUpdated => res.send('Recipe updated',recipeUpdated))
    .catch(console.log('An error occured'));
});

router.post('/recipe/delete', (req, res, next) => {
  Recipe.deleteOne(req.body)
    .then(recipeDeleted => res.send('Successfully deleted',recipeDeleted))
    .catch(console.log('An error occured'));
});

router.post('/recipe/new', (req, res, next) => {
    console.log(req.body)
    Recipe.create(req.body)
    .then(recipeCreated => res.send(recipeCreated))
    .catch(err => console.log(err))
});

module.exports = router;
