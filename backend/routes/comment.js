//Comment routes that execute CRUD
//Comment imported is from comment model file and communicates with mongoDB compass to run methods
//req is the state object from the frontend component that gets passed through in the axios call 
//res is the response to the front end
//Additional routes to add comments to recipe, as well as save, update, delete comments from those in recipe
// 1) Returns all comments for a recipe
// 2) Returns all comments for a user
// 3) Update comment if authorized
// 4) Delete comment if authorized
// 5) Add new comment to activity for user


const router = require('express').Router();
const Comment = require('../models/Comment');
const Profile = require('../models/Profile');


// 1) Returns all comments for a recipe
router.get('/comment/:commentID', (req, res, next) => {
    Comment.find({commentID:req.params.commentID})
    .then(commentsFound => {
        res.send(commentsFound)
    })
    .catch(err => console.log(err))
//   res.status(200).json({ msg: 'Working' });
});

// 2) Returns all comments for a user
// router.get('/comment/:userID',isAuth, (req, res, next) => {    
//     Profile.find({UserID:req.params.userID})
//         .then(profileFound=> {
//             Comment.find({profileID:profileFound._id})
//             .then(commentFound => {
//                 res.send(commentFound)
//             })
//             .catch(err => console.log(err))
//         })
//         .catch(err => console.log('An error occured',err))
// });

// 3) Updates a comment
router.post('/update',isAuth, (req, res, next) => {
    let comment = req.body
    Profile.find({UserID:req.user._id})
        .then(profileFound=> {
            if(comment.profileID===profileFound._id){
            Comment.updateOne(req.body)
            .then(commentUpdated => res.send('comment updated',commentUpdated))
            .catch(console.log('An error occured'));
            } else {
                res.json({errorMessage: "Only creator of comment can edit"})
            }
        })
        .catch(err => console.log('An error occured',err))
    });

// 4) Deletes a comment from database
router.post('/delete',isAuth, (req, res, next) => {
    let comment = req.body
    Profile.find({UserID:req.user._id}).then(profileFound=> {
    if(comment.profileID===profileFound._id){
        Comment.deleteOne(req.body)
        .then(commentDeleted => res.send('Successfully deleted',commentDeleted))
        .catch(console.log('An error occured'));
    } else {
        res.json({errorMessage: "Only creator of comment can delete"})
    }
    })
    .catch(console.log('An error occured'));
});

// 5) Adds new comment
router.post('/new',isAuth, (req, res, next) => {
    console.log(req.body)
    let comment = req.body
    Profile.find({UserID:req.user._id}).then(profileFound=> {
        comment.profileID=profileFound._id   
        Comment.create(comment)
        .then(commentCreated => res.send(commentCreated))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
});

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}
module.exports = router;