var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Game = require('../models/Game');

router.get('/games', function(req, res){
	Game.find({}, function(err, games){
		res.json(games);
	})
})

router.get('/games/:id', function(req, res){
	Game.find({_id: req.params.id}, function(err, game){
		res.json(game);
	})
})

module.exports = router;
