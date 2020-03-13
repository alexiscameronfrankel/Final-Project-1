


const router = require('express').Router();
const Comment = require('../models/Comment');


//Returns all comments for a recipe
router.get('/comment/:recipeID', (req, res, next) => {
    Comment.find({recipeID:req.params.recipeID})
    .then(commentsFound => {
        res.send(commentsFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

//Returns all comments for a user
router.get('/comment/:userID',isAuth, (req, res, next) => {    
    
    Comment.find({userID:req.params.userID})
    .then(commentFound => {
        res.send(commentFound)
    })
    .catch(err => console.log(err))
});

//Updates a comment
router.post('/update',isAuth, (req, res, next) => {
  let commentUserID=req.body.userID
  if(commentUserID===req.user._id){
    Comment.updateOne(req.body)
    .then(commentUpdated => res.send('comment updated',commentUpdated))
    .catch(console.log('An error occured'));
    } else {
        res.json({errorMessage: "Only creator of comment can edit"})
    }
});

//Deletes a comment from database
router.post('/delete',isAuth, (req, res, next) => {
    let commentUserID=req.body.userID
    if(commentUserID===req.user._id){
        Comment.deleteOne(req.body)
        .then(commentDeleted => res.send('Successfully deleted',commentDeleted))
        .catch(console.log('An error occured'));
    } else {
        res.json({errorMessage: "Only creator of comment can delete"})
    }
});

//adds new comment
router.post('/new',isAuth, (req, res, next) => {
    console.log(req.body)
    let comment = req.body
    comment.userID=req.user._id
    Comment.create(comment)
    .then(commentCreated => res.send(commentCreated))
    .catch(err => console.log(err))
});

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}
module.exports = router;