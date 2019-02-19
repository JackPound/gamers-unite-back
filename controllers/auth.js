 require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/User');
var cors = require('cors');

// POST route to login to existing User, returns JWT
router.post('/login', function(req,res){
	User.findOne({email: req.body.email})
	.then(function(user){
		if(!user || !user.password){
			return res.status(403).send('User not found');
		}
		if(!user.authenticated(req.body.password)){
			return res.status(401).send('Invalid Credentials');
		}
		var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
			expiresIn: 60 * 60 * 24
		})
		res.send({ user: user, token: token });
	})
	.catch(function(err){
		return res.status(503).send('Database error');
	})
});

// POST route to signup a new User
router.post('/signup', cors(), function(req,res){
	User.findOne({ email: req.body.email })
	.then(function(user){
		if(user){
			return res.status(400).send('User exists already');
		}
		User.create(req.body)
		.then(function(createdUser){
			var token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
				expiresIn: 60 * 60 * 24
			})
			res.send({ user: user, token: token });
		})
		.catch(function(err){
			res.status(500).send('Could not create user in DB');
		})
	})
	.catch(function(err){
		res.status(500).send('Database Problems');
	})
})

// check if token to validate a current User
router.post('/me/from/token', function(req, res){
	res.send({ user: req.user });
})

module.exports = router;