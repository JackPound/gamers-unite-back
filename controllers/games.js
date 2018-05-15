var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Game = require('../models/Game');
var User = require('../models/User');

router.get('/games', function(req, res){
	Game.find({}, function(err, games){
		res.send(games);
	})
})
router.get('/games/:id', function(req, res){
	Game.find({_id: req.params.id}, function(err, game){
		res.send(game);
	})
})

// NEEED TO PASS USER ID HERE TO POST TO LOGGED IN USERß
router.post('/games/:id', function(req, res){	
	User.findByIdAndUpdate(
		'5afa67e6355216849d45a319',
		{$push: {'playedGames': req.params.id}},
		{safe: true, upsert: false, new: true},
		function(err, model){
			if(err){
				console.log(err)
			};
		}).then(
	res.send('hello?'))
})


router.delete('/games/:id', function(req, res){
	// User.find({_id: req.user.id}, function(err, user){

	// })
	console.log(req.body);
	res.send('clicked game to delete')
})

module.exports = router;
