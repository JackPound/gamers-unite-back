var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Game = require('../models/Game');
var User = require('../models/User');
var random = require('mongoose-random');

User.syncRandom(function (err, result){
	console.log(result.updated);
})

Game.syncRandom(function (err, result){
	console.log(result.updated);
})