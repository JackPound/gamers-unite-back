const mongoose = require('mongoose');
const Game = require('../models/Game');

mongoose.connect('mongodb://localhost/project3')

Game.collection.drop();

const seedGames = () => {
	const Games = [
		{name: 'PUBG', platform: 'PC'},
		{name: 'League of Legends', platform: 'PC'},
		{name: 'CS:GO', platform: 'PC'},
		{name: 'Overwatch', platform: 'PC'},
		{name: 'Destiny 2', platform: 'PC'},
		{name: 'DotA 2', platform: 'PC'},
		{name: 'Fortnite', platform: 'PC'},
		{name: 'HotS', platform: 'PC'},
		{name: 'Rocket League', platform: 'PC'},
		{name: 'Rainbow 6 Siege', platform: 'PC'},
		{name: 'World of Warcraft', platform: 'PC'},
		{name: 'CoD WWII', platform: 'PC'},
		{name: 'Battlefield 1', platform: 'PC'},
		{name: 'Minecraft', platform: 'PC'}
	];
	Games.forEach((game) => {
		Game.create(game);
	});
	console.log('database seeded')
}

seedGames()

setTimeout(function () {
	mongoose.connection.close();
}, 5000)