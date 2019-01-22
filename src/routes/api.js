const express = require('express');
const connect = require('connect-ensure-login');

const Post = require('../models/post');
const User = require('../models/user');

const router = express.Router();

router.get('/user', function(req, res) {
    //use req.query to get the passed in ID
   
    //User model to query Mongo User Collection and access that user object
    //right method you should use in findOne({'_id' : PassedInIDHere})
   
    //return that object to the user 
   
    User.findOne({_id: req.query._id}, function(err, user){
      res.send(user);
    });
});

//add .get endpoint to access all stories written by specific user from database
//insert function here

//add .post endpoint for drafts

//add .get endpoints for drafts


router.post('/post', connect.ensureLoggedIn(), function(req, res) {
    const newPost = new Post({
        'creator_id': req.user._id,
        'creator_name': req.user.name,
        'content': req.body.content,
    });
   
    newPost.save(function(err,story) {
        User.findOne({_id: req.user.id}, function(err,user) {
            user.last_post = req.body.content; //change
           user.save();
        });
        // configure socketio
        if (err) console.log(err);
    });
   
    res.send({});
});

router.get('/posts', function(req, res) {
    Post.find({}, function(err, posts) {
        res.send(posts);
    });
});

//figure out timer
router.get('/todayposts', function(req, res) {
    Post.find({}, function(err, posts) {
        res.send(posts);
    });
});

router.get('/userposts', function(req,res) {
    Post.find({creator_id: req.query.creator_id})
})

//work in progress
router.post('/draft', connect.ensureLoggedIn(), function(req, res) {
    const newDraft = new Draft({
        'creator_id': req.user._id,
        'creator_name': req.user.name,
        'content': req.body.content,
    });
   
    newDraft.save(function(err,story) {
        User.findOne({_id: req.user.id}, function(err,user) {
            user.last_post = req.body.content; //change
           user.save();
        });
        // configure socketio
        if (err) console.log(err);
    });
   
    res.send({});
});

router.get('/userdrafts', function(req,res){
    Draft.find({creator_id: req.query.creator_id}, function(err, drafts){
        res.send(drafts);
    })
});

router.post('/upvote', connect.ensureLoggedIn(), function(req,res) {
    Post.findById(req.body._id, function(err, post){
        if(post){
            post.upvotes += 1
            post.save(function(err){
                if(err) {
                    console.log("unable to update vote")
                }
            });
        }else{
            console.log(err);
        }
        res.send({post});
      });

})


module.exports = router;