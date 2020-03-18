const express = require('express');
const router  = express.Router();
const Recipe = require('../models/Recipe')
// include CLOUDINARY:
const uploader = require('../config/cloudinary-setup');
const uploadervideo = require('../config/cloudinary-setup-video');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})

router.post('/uploadvideo', uploadervideo.single("video"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
})

//the other side return service.post('/recipe/create', recipe) <--- makes this work

router.post('/recipe/create', (req,res,next) => {
  console.log(req.body);
  Recipe.create(req.body) 
  .then(data => res.json(data)).catch(err => res.json(err)) //returns response

})


module.exports = router;