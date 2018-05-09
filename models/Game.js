var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
	cover: {
		url: String,
		cloudinary_id: String,
		width: Number,
		height: Number
	},
	genres: [Number],
	id: Number,
	name: String,
	platforms: [Number],
	summary: String
});

var Game = mongoose.model('Game', gameSchema);
module.exports = Game; 