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
// get all users of a game
// router.get('/games/:id/users',function(req, res){
// 	User.find({ playedGames: req.params.id }, 'username email -_id', function(err, docs){
// 		console.log(docs)
// 		res.send(docs)
// 	})
// })

router.get('/games/:id/users',function(req, res){
	User.count().exec(function(err, count){
		var random = Math.floor(Math.random() * count)
		User.findOne({ playedGames: req.params.id }, 'username email -_id').skip(random).exec(
			function(err, docs){
				console.log(docs)
				res.send(docs)
			}
		)
	})
})
	
// remove a game from a user
router.delete('/games/:id', function(req, res){
	// User.find({_id: req.user.id}, function(err, user){

	// })
	console.log(req.body);
	res.send('clicked game to delete')
})

router.get('/random', function(req, res){
	Game.count().exec(function (err, count) {
		var random = Math.floor(Math.random() * count)
		console.log(random)
		Game.findOne().skip(random).exec(
			function(err, result){
				res.send(result)
			}
		)
	})
})

module.exports = router;