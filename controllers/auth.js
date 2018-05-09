require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/User');

// POST route to login to existing User, returns JWT
router.post('/login', function(req,res){
	console.log('request to /login', req);
})

// POST route to signup a new User 
router.post('/signup', function(req,res){
	console.log('request to /signup', req)
})

// check if token to validate a current User
router.post('/me/from/token', function(req, res){
	console.log('find user from token');
})

module.exports = router;