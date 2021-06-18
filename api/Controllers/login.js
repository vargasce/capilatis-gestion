// CONTROLADOR LOGIN

'use strict'
const con = require('../DB-connect/connectdb');
const usr = require('./Session/Session');
const  md5 = require('md5');
const add = require('../Custom/activos');
const log = require('../Custom/logs');


const controller = {

   getSession: ( req, res )=> {
     const data = req.body;

		 con.select( 'SELECT id,usuario,nombre,apellido,correo,imagen,activo,plataform_activo FROM administrador WHERE usuario = "'+ data.user +'" and pass = "'+ md5(data.pass) +'";', ( error, resultset )=> {
			 if ( error == '' ){
				 if( resultset.length > 0 ){
					 let decode = usr.getSession( resultset );
					 addDatesSession( req, decode );
 	         return res.status(200).send({'error':'','Resulset': decode });
				 }else{
					 return res.status(200).send({'error':'Usuario o Contraseña incorrecto..!!!'});
				 }
			 }else{
           return res.status(500).send({'error': 'usuario y/o constraseña invalido'});
			 }
		 });

   },

	closeSession: ( req, res )=>{

		if( add.disconect( req.body.id ) ){
			return res.status(200).send({ 'error' : '', 'Resultset' : 'Disconect !!!' });
		}else{
			return res.status(500).send({ 'error' : 'Error al desconectar', 'Resultset' : 'Disconect error!!!' });
		}

	}

};

module.exports = controller;

/** ACTUALIZAR ACTIVOS Y LOG 
 * @Observations : Añadimos log de sistema y cargamos el usuario activo.
 * @param req : Object => request.
 */ 
const addDatesSession = ( req, decode ) =>{

		let origen = {
			'browser' : req.useragent.browser,
			'plataform' : req.useragent.platform,
			'os' : req.useragent.os,
			'version' : req.useragent.version,
			'user' : decode.user[0].id,
			'active' : true
		};

		add.active( origen );
		log( 'Inicio Session', req.originalUrl, decode.token );  		
};


