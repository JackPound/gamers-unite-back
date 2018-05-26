const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://heroku_c23d3bwq:2osgmiemi73bp8j4pkqfca7o9o@ds123790.mlab.com:23790/heroku_c23d3bwq')



const seedUsers = () => {
	const Users = [
		{username: 'anotherP', email: '1@1.com', password: 12341234, playedGames: ['5b099958a7cd504eace05927','5b099958a7cd504eace05928','5b099958a7cd504eace05929','5b099958a7cd504eace0592b','5b099958a7cd504eace0592c','5b099958a7cd504eace0592a','5b099958a7cd504eace0592e','5b099958a7cd504eace05930','5b099958a7cd504eace0592f','5b099958a7cd504eace05932','5b099958a7cd504eace05933','5b099958a7cd504eace05931','5b099958a7cd504eace05934']}
	];
	Users.forEach((user) => {
		User.create(user);
	});
	console.log('database seeded')
}

seedUsers()

setTimeout(function () {
	mongoose.connection.close();
}, 5000)



	






