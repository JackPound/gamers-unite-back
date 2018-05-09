var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');

router.get('/users', function(req, res){
	User.find({}, function(err, users){
		res.json(users);
	})
})

router.get('/users/:id', function(req, res){
	User.find({_id: req.params.id}, function(err, user){
		res.json(user);
	})
})

module.exports = router;