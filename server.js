require('dotenv').config();
var cors = require('cors')
var mongoose = require('mongoose')
var express = require('express');
var expressJWT = require('express-jwt');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project3')

app.use(bodyParser.json());
app.use(cors())

// Routes for games/single game
app.use('/api/v1', require('./controllers/games'))
// Routes for login/signup
app.use('/auth', expressJWT({
	secret: process.env.JWT_SECRET,
	getToken: function fromRequest(req) {
		if(req.body.headers.Authorization &&
			req.body.headers.Authorization.split(' ')[0] === 'Bearer') {
			return req.body.headers.Authorization.split(' ')[1];
		}
		return null;
	}
}).unless({
	path: [
	{url: '/auth/login', methods: ['POST']},
	{url: '/auth/signup', methods: ['POST']}
	]
}), require('./controllers/auth'));
// Listening on a port 
let port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Listening PORT: ${ port }`);
});