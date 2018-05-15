var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res){
	User.find({}, function(err, users){
		res.send(users);
	})
})

router.get('/:id', function(req, res){
	User.find({_id: req.params.id}, function(err, user){
		res.send(user);
	})
})

module.exports = router;