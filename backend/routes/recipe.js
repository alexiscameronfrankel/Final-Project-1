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

router.post('/recipe/new', (req, res, next) => {
    console.log(req.body)
    Recipe.create(req.body)
    .then(recipeCreated => res.send(recipeCreated))
    .catch(err => console.log(err))
});

module.exports = router;
