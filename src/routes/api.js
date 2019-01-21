const express = require('express');
const connect = require('connect-ensure-login');

const Post = require('../models/post');
const Creator = require('../models/creator');

const router = express.Router();


module.exports = router;