var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	username: {
		type: String, 
		required: true, 
		unique: true,
		minlength: 1,
		maxlength: 16
	},
	email: {
		type: String, 
		required: true, 
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 20
	},
	age: Number,
	gender: String,
	language: [String],
	prefTime: [Number],
	playedGames: [], // TODO : REFRENCE GAME SCHEMA + STRUCTURE SKILL LEVEL
	friends: [String],
	avoidedPlayers: [String],
	activeNow: Boolean
});
// remove password from being returned with the toJSON method of User
userSchema.set('toJSON', {
	transform: function(doc, user, options) {
		var returnJson = {
			id: user._id,
			email: user.email,
			username: user.username,
			age: user.age,
			gender: user.gender,
			language: user.language,
			prefTime: user.prefTime,
			playedGames: user.playedGames,
			friends: user.friends,
			avoidedPlayers: user.avoidedPlayers,
			activeNow: user.activeNow
		}
		return returnJson;
	}
})
// set authenticated method for User, to check if correct password
userSchema.methods.authenticated = function(password) {
	return bcrypt.compareSync(password, this.password)
}
// store hashed password in database instead of text password
userSchema.pre('save', function(next) {
	var hash = bcrypt.hashSync(this.password, 10);
	this.password = hash;
	next();
})


var User = mongoose.model('User', userSchema);
module.exports = User; 
