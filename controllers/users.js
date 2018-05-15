var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Game = require('../models/Game');
var User = require('../models/User');
var random = require('mongoose-simple-random');

function arrayContains(item, inArray){
	return(inArray.indexOf(item) > -1);
}

router.get('/', function(req, res){
	User.find({}, function(err, users){
		res.send(users);
	})
})
router.get('/:id', function(req, res){
	User.findById(req.params.id, function(err, user){
		res.send(user);
	})
})
router.get('/:id/games', function(req, res){
	User.findById(req.params.id).populate('playedGames').exec(function(err, user){
		let myGames = []
		for(i=0; i<user.playedGames.length; i++){
			if(!arrayContains(user.playedGames[i].name, myGames)){
				myGames.push(user.playedGames[i].name)
			}
		}
		res.send(myGames)
	})
})
router.get('/random')
module.exports = router;