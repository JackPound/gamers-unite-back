const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://localhost/project3')



const seedUsers = () => {
	const Users = [
		
		{username: 'braindeadTmate', email: '9@9.com', password: 12341234, playedGames: ['5af9d516ef975074549a1902', '5af9d516ef975074549a1906', '5af9d516ef975074549a1903', '5af9d516ef975074549a1904', '5af9d516ef975074549a1905', '5af9d516ef975074549a1909', '5af9d516ef975074549a1907', '5af9d516ef975074549a190b', '5af9d516ef975074549a1908', '5af9d516ef975074549a190a', '5af9d516ef975074549a190e', '5af9d516ef975074549a190c', '5af9d516ef975074549a190d', '5af9d516ef975074549a190f']}
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



	






