const express = require('express');
const connect = require('connect-ensure-login');

const Post = require('../models/post');
const User = require('../models/user');
const Draft = require('../models/draft');
const Prompt = require('../models/prompt');

const router = express.Router();

router.get('/whoami', function(req,res) {
    console.log("this is the user");
    console.log(req.user);
    if(req.isAuthenticated()){
        res.send(req.user);
        //test
        console.log("user authenticated");
    }
    else{
        res.send({});
        //test
        console.log("no user authenticated");
    }
});

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
        'prompt': req.body.prompt,
        'content': req.body.content,
        'upvotes': req.body.upvotes,
        'date': req.body.date,
    });
   
    newPost.save(function(err) {
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


router.get('/todaysposts', function(req, res) {
    Post.find({date: req.query.date}, function(err, todaysposts) {
        res.send(todaysposts);
    });
});

router.get('/userposts', function(req,res) {
    Post.find({creator_id: req.query.creator_id}, function(err, userposts){
        res.send(userposts);
    })
});

//work in progress
router.post('/draft', connect.ensureLoggedIn(), function(req, res) {
    const newDraft = new Draft({
        'creator_id': req.user._id,
        'creator_name': req.user.name,
        'content': req.body.content,
        'prompt': req.body.prompt,
        'date': req.body.date,
    });
   
    newDraft.save(function(err,story) {
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
            post.save(function(err, post){
                //const io = req.app.get('socketio');
                //io.emit('post', post);
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

/*router.get('/getupvote', function(req, res) {
    Post.findById(req.body._id, function(err,))
})*/

router.post('/prompt', function(req,res){
    const newPrompt = new Prompt ({
        'prompt': req.body.prompt,
        //'timestamp': req.body.timestamp, //may comment out
    });

    newPrompt.save(function(err,prompt){
        const io = req.app.get('socketio');
        io.emit('prompt', prompt);

        if (err) console.log(err);
    });

    res.send({});
});

router.get('/getprompt', function(req,res){
    Prompt.findOne().sort({$natural:-1}).exec(function(err, prompt){
        res.send(prompt);
    })
});


module.exports = router;