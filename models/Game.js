var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var gameSchema = new mongoose.Schema({
	cover: {
		url: String,
		cloudinary_id: String,
		width: Number,
		height: Number
	},
	genres: [String],
	name: String,
	platform: String,
	summary: String
});

gameSchema.plugin(random);

var Game = mongoose.model('Game', gameSchema);
module.exports = Game; 