const express = require('express');
const connect = require('connect-ensure-login');

const Story = require('../models/story');
const Creator = require('../models/creator');

const router = express.Router();

router.get('/', function(req, res) {
    //use req.query to get the passed in ID
   
    //User model to query Mongo User Collection and access that user object
    //right method you should use in findOne({'_id' : PassedInIDHere})
   
    //return that object to the user 
   
    Creator.findOne({_id: req.query._id}, function(err, user){
      res.send(user);
    });
});

//add .get endpoint to access all stories written by specific user from database
//insert function here




router.get('/stories', function(req, res) {
    Story.find({}, function(err, stories) {
        res.send(stories);
    });
});
   
router.post('/story', connect.ensureLoggedIn(), function(req, res) {
    const newStory = new Story({
        'creator_id': req.user._id,
        'creator_name': req.user.name,
        'content': req.body.content,
    });
   
    newStory.save(function(err,story) {
        User.findOne({_id: req.user.id}, function(err,user) {
            user.last_post = req.body.content;
           user.save();
        });
        // configure socketio
        if (err) console.log(err);
    });
   
    res.send({});
});

module.exports = router;