const express = require('express');
const router = expresss.Router()

router.get('/', function(req,res) {
    res.sendFile('index.html', {root: 'src/views'})
    //res.send("hello world");
    console.log("success");
})
router.get('/u/profile', function(req,res){
    res.sendFile('profile.html', {root: 'src/views'})
})

module.exports = router;