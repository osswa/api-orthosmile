'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = Schema({
	nombre: String,
	paterno: String,
	materno: String,
	email: String,
	calle: String,
	colonia: String,
	ciudad: String,
	estado: String,
	cp: String,
	telefono: String,
	pass: String,
	tel_emergencia: String,
	sangre: String,
	contacto: String,
	parentesco: String,
	sucursal: String,
	genero: String,
	fecha_nacimiento: String,
	imagen: String,
	rol: String
});

module.exports = mongoose.model('usuario', usuarioSchema);

