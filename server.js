require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors')
var express = require('express');
var expressJWT = require('express-jwt');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project3');
// mongoose.connect('mongodb://localhost/project3');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())



// Routes for games/single game
app.use('/api/v1', require('./controllers/games'))

app.use('/users', require('./controllers/users'))
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
