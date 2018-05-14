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

// NEEED TO PASS USER ID HERE TO POST TO LOGGED IN USER
router.post('/games/:id', function(req, res){
	// console.log('req outside:', req.params.id)
	// User.find({_id: '5af9cfd2e5f3af735c9c118d'}, function(err, user){
	// 	if(err){
	// 		console.log('error saving game', err);
	// 	} else if(user){
	// 		user.playedGames.push(req.params.id)
	// 		user.save(function(err){
	// 			if(err){
	// 				console.log('db error saving game', err);
	// 			}
	// 		})
	// 		console.log(user.playedGames);
	// 		console.log('req inside', req.params.id);
	// 		res.send('clicked game to favorite')
	// 	}
	// })
	
	User.findByIdAndUpdate(
		'5af9cfd2e5f3af735c9c118d',
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
