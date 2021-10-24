'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/orthosmiledb', (err, res) => {
mongoose.connect('mongodb+srv://granpas:granpas@cluster0.blcmi.mongodb.net/orthosmiledb', (err, res) => {
	if(err) {
		throw err;
	} else {
		console.log('La base de datos esta corriendo...');

		app.listen(port, function(){
			console.log('Servidor escuchando en port: ' + port);
		});
	}
});