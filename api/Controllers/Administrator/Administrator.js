'use strict'

const con = require('../../DB-connect/connectdb');
//const custom = require('../../Custom/funciones');
const usr = require('../Session/Session');
const log = require('../../Custom/logs');
const custom = require('../../Custom/funciones');
const  md5 = require('md5');

const controller = {

	setAdministrator : ( req, res ) => {
		
		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			
			if( decode ){
			
				switch (req.body.tipe) {

				  case 'NEW':

						isDuplicate( req.body.date ).then( ()=>{

							let sqlInsert = getSqlInsertAdministrator( req.body.date );
							con.insert( sqlInsert, ( error, result ) =>{

								if( !error ){
									log( 'Insert Admin', req.originalUrl , req.body.token );
									return res.status(200).send({ 'error' : '', 'Resultset' : usr.getSession( decode.obj[0] ) });
								}else{
									log( 'Error insert admin', req.originalUrl, req.body.token );
									console.log(`Error nuevo administrador, funcion Administrator : ${error} result : ${result}`);
									return res.status(500).send({ 'error' : `Error nuevo administrador : ${error} result : ${result}` });
								}

							});

						}).catch( ()=>{

							//ES USUARIO DUPLICADO.
							log( 'Error insert duplicate ADM', req.originalUrl, req.body.token );
							console.log(`Error nuevo administrador duplicado, funcion Administrator : ${error}`);
							return res.status(200).send({ 'error' : `Lo siento, Usuario : '${req.body.date.usuario}' o '${req.body.date.correo}' ya existe !!!` });

						});

			    break;

				  case 'UPDATE':

						let sqlUpdate = getSqlUpdateAdministrator( req.body.date, req.body.id );
						con.update( sqlUpdate, ( error, result ) =>{
							
							if( !error ){
								log( 'Update Admin', req.originalUrl , req.body.token );
								return res.status(200).send({ 'error' : '', 'Resultset' : usr.getSession( decode.obj[0] ) });
							}else{
								log( 'Error update Admin', req.originalUrl , req.body.token );
								console.log(`Error update administrador, funcion Administrator : ${error} result : ${result}`);
								return res.status(500).send({ 'error' : `Error update administrador : ${error} result : ${result}` });
							}

						});

			    break;
					default : 
						
				}

			}else{
				return res.status(500).send({ 'error' : `Error en token : ${error}`, 'sessionFail' : 'true' });
			}

		});

	},

	/** GET ADMINISTRATOR
	 * @Observations : obtenemos administrador por id.
	 */ 
	getAdministrator : ( req, res ) => {

		custom.getSqlForId( req, 'administrador', 'id', req.body.id ).then( (result) =>{
			return res.status(200).send(result);		
		}).catch( (error) =>{
			return res.status(200).send(error);
		});	

	}

}

module.exports = controller;


/** NEW ADMINISTRATOR
 * @Observations :  Armo string para realizar nueva alta de administrador
 * @param : data => Object con datos de administrador
 * @returns : string => sql
 */ 
const getSqlInsertAdministrator = ( data ) =>{
	
	let passEncripted = md5(data.pass);
	let dateActive = new Date();
	let dateFormat = `${dateActive.getFullYear()}-${dateActive.getMonth() -1}-${dateActive.getDate()}`;
	let hourActive = `${dateActive.getHours().toString()}-${dateActive.getMinutes().toString()}`;
	
	let sql = `INSERT INTO administrador ( usuario, pass, nombre, apellido, pregunta, respuesta, correo, id_extreme, tipo, imagen, activo, fecha_activo, hora_activo, os_activo, plataform_activo, t_jefe, id_sector )
						 	VALUES `;
			sql += `('${data.usuario}' ,
					 '${passEncripted}' ,
					 '${data.nombre}' ,
					 '${data.apellido}' ,
					 '${data.pregunta}' ,
					 '${data.respuesta}' ,
					 '${data.correo}',
					 '${data.id_extreme}' ,
					 '${data.tipo}' ,
					 '${data.imagen}' ,
					 ${data.activo} ,
					 '${dateFormat}' ,
					 '${hourActive}' ,
					 '${data.os_activo}' ,
					 '${data.plataform_activo}' ,
					 ${data.t_jefe} ,
					 ${data.id_sector} );`;

	return sql;
}

/** UPDATE ADMINISTRATOR
 * @Observations : Armos string para realizar update en data base
 * @param : data => Object con datos de administrador
 * @returns : string => sql
 */ 
const getSqlUpdateAdministrator = ( data, id ) =>{
	let sql = 'UPDATE administrador SET ';
	let passEncripted = md5(data.pass);

	sql += ` usuario = '${data.usuario}' ,
					 pass = '${passEncripted}' ,
					 nombre = '${data.nombre}' ,
					 apellido = '${data.apellido}' ,
					 pregunta = '${data.pregunta}' ,
					 respuesta = '${data.respuesta}' ,
					 correo = '${data.correo}' ,
					 tipo = ${data.tipo} ,
					 t_jefe = ${data.t_jefe} 
					 WHERE id = ${id} ;`;

	return sql;
}

/** VALIDATE ADMINISTRATOR
 * @Observations : Valido si el administrador que se quiere dar de alta ya existe en la base de datos.
 *                 Se valida nombre de usuario y email.
 * @param : data => Object con datos de administrador.
 * @returns : boolean => ( TRUE or FALSE ) si existe.
 */ 
const isDuplicate = ( data ) =>{

	return new Promise( (resolve, reject ) =>{

	let sql = `SELECT *  FROM administrador WHERE usuario = '${data.usuario}' OR correo = '${data.correo}' ;`;

		con.select( sql, ( error, result ) =>{
			if( !error ){
				console.log( result )
				if( result ){
					reject();
				}else{
					resolve();
				}
			}else{
				console.log(`Error validando usuario : Administrador.js, error : ${error} , result : ${result}`);
				reject();
			}
		});

	});


}


/** ADD PERMISES
 * @Observations : Funcion para agregar los permisos de acceso a los usuario
 * administradores, cabe destacar que nos referiamos a cualquier usuario con acceso al sistema.
 *
 * @param id : string =>  identificador del usuario.
 * @param data : Object => Objeto con los datos de permisos.
 */ 
async function uploadPermissions ( id, data ){

	let modulo = data.modulo;
	let employee = data.employee;
	let holidays = data.holidays;
	let administrador = data.administrador;
	let news = data.news;
	let report = data.report;
	let various = data.various;

	await setPermissions( id, modulo, 'dbpermisomodulo' );
	await setPermissions( id, employee, 'dbpermisoempleado' );
	await setPermissions( id, holidays, 'dbpermisoholidays' );
	await setPermissions( id, administrador, 'dbpermisomodulo' );
	await setPermissions( id, news, 'dbpermisomodulo' );
	await setPermissions( id, report, 'dbpermisomodulo' );
	await setPermissions( id, various, 'dbpermisomodulo' );
	
}

const setPermissions = ( id, data, modulo ) =>{
	return new Promise( ( resolve, reject ) =>{
		
		let column = '';
		let value = '';
		let sql = '';

		Object.entries(data).forEach( (value, index) =>{		
			column += index + ',';
			value += value + ',';
		});

		column = column.substring( 0,column.length-1 );
		value = value.substring( 0, value.length-1 );

		sql += `INSERT INTO ${modulo} ('id',${column}) VALUES (${id},${value});`;

		con.insert(sql,( error, result ) =>{

			if( result ){
				resolve();
			}else{
				console.log('Aca a cague toda : ' + error);
				reject();
			}
		});

	});
}







