'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuarios'});

api.get('/probando', md_auth.ensureAuth, UsuarioController.prueba);
api.post('/login', UsuarioController.loginUsuario);
api.post('/guarda_recepcionista', UsuarioController.guardaUsuario);
api.put('/update_usuario/:id', md_auth.ensureAuth, UsuarioController.updateUsuario);
api.post('/upload_imagen_usuario/:id', [md_auth.ensureAuth, md_upload], UsuarioController.uploadImagen);
api.get('/get_imagen_usuario/:imagenFile', UsuarioController.getImagen);

module.exports = api;