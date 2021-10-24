'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario')
var jwt = require('../services/jwt');

function prueba(req, res){
	res.status(200).send({
		message: 'Metodo prueba'
	});
}

function loginUsuario(req, res)
{
	var params = req.body;

	var email = params.email;
	var password = params.pass;

	Usuario.findOne({email: email.toLowerCase()}, (err, usuario) => {
		if(err)
		{
			res.status(500).send({message: 'Error en la busqueda de usuario'});
		} else
		{
			if(!usuario)
			{
				res.status(404).send({message: 'El usuario no existe'});
			} else
			{
				bcrypt.compare(password, usuario.pass, function(err, check){
					if(check)
					{
						if(params.getHash)
						{
							res.status(200).send({token: jwt.createToken(usuario)});
						} else
						{
							res.status(200).send({usuario});
						}						
					} else
					{
						res.status(404).send({message: 'El usuario no ha podido loguearse'});
					}
				});				
			}			
		}
	});
}

function guardaUsuario(req, res) 
{
	var usuario = new Usuario();
	var params = req.body;

	//console.log(params);

	usuario.nombre = params.nombre;
	usuario.paterno = params.paterno;
	usuario.materno = params.materno;
	usuario.email = params.email;
	usuario.calle = params.calle;
	usuario.colonia = params.colonia;
	usuario.ciudad = params.ciudad;
	usuario.estado = params.estado;
	usuario.cp = params.cp;
	usuario.telefono = params.telefono;
	//usuario.pass = params.pass;
	usuario.tel_emergencia = params.tel_emergencia;
	usuario.sangre = params.sangre;
	usuario.contacto = params.contacto;
	usuario.parentesco = params.parentesco;
	usuario.sucursal = params.sucursal;
	usuario.genero = params.genero;
	usuario.fecha_nacimiento = params.fecha_nacimiento;
	usuario.imagen = params.imagen;	
	usuario.rol = params.rol;
	
	if(params) 
	{
		bcrypt.hash(params.pass, null, null, function(err, hash){
			usuario.pass = hash;

			usuario.save((err, usuarioGuardado) => {
				if(err) 
				{
					res.status(404).send({message: 'No se guardó el usuario'});
				} else 
				{
					res.status(200).send({usuario: usuarioGuardado}); 
				}
			});
		});		
	}
}

function updateUsuario(req, res)
{
	var userId = req.params.id;
	var update = req.body;

	Usuario.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err)
		{
			res.status(500).send({message: 'Error al actualizar usuario'});
		} else
		{
			res.status(200).send({usuario: userUpdated});
		}
	});
}

function uploadImagen(req, res)
{
	var userId = req.params.id;
	var file_name = 'No subido...';

	if(req.files)
	{
		var file_path = req.files.imagen.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		Usuario.findByIdAndUpdate(userId, {imagen: file_name}, (err, userUpdated) => {
			if(!userUpdated)
			{
				res.status(404).send({message: 'No se actualizó el usuario'});
			} else {
				res.status(200).send({usuario: userUpdated});
			}
		});
	} else
	{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImagen(req, res)
{
	var imagenFile = req.params.imagenFile;
	var path_file = './uploads/usuarios/' + imagenFile;
	fs.exists(path_file, (exists) => {
		if(exists)
		{
			res.sendFile(path.resolve(path_file));
		} else 
		{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	prueba,
	guardaUsuario,
	loginUsuario,
	updateUsuario,
	uploadImagen,
	getImagen
};