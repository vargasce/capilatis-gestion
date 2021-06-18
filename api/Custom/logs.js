'use strict'

const date = require('./dates');
const con = require('../DB-connect/connectdb');
const usr = require('../Controllers/Session/Session');
 
/** AÑADIR LOG DE EVENTOS.
 * @Observations : Este metodo sirve para realizar carga de eventos en el sistema.
 * se puede ejecutar en modulos sesibles para tener un registro de quien ingresa y que funcion
 * utilizo, incluso en el caso de error tambien queda registrado.
 */ 
const addLog = ( message, funcion, token ) => {

	usr.getUserValidate( token, ( error, decode ) =>{
		
		if( decode ){

			let sql = `INSERT INTO dblog ( id_user, fecha, observacion, hora, funcion ) VALUES (   '${decode.obj[0].id}' ,
																									'${date.getDateCurrentStringCustom()}' ,
																									'${message}' ,
																									'${date.getHourMinuteCurrent()}' ,
																									'${funcion}' );`;
			con.insert( sql, ( err, result ) =>{
				if( !err ){
				}else{
					console.error(`Error en logs : ${err}`);
				}
			});

		}else{

			let sql = `INSERT INTO dblog ( id_legajo, fecha, observacion, hora, funcion ) VALUES ( 'no definido',
																										'${date.getDateCurrentStringCustom()}',
																									'${error}', 
				                                                                                     '${date.getHourMinuteCurrent()}',
				                                                                                     '${funcion}' )`;
			con.insert( sql, ( err, result ) =>{
				if( !err ){
				}else{
					console.error(`Error en log : ${err}`);
				}
			});
		}
	
		//POR ALGUNA EXTAÑA RAZON , NO LE GUSTA QUE CIERRE LA CONEXION DEBIDO A QUE QUEDA PETICIONES EN COLA, SE PODRIA EVALUAR, DE TODAS MANERAS SOLO
		//MANTENEMOS UNA UNICA INSTACIA DE CONEXION. ( ATENTOS A LA CONCURRENCIA, PUEDE LLEVAR A CAMBIOS GRANDES EN LA CONEXION A LA DB ).
		//con.close();
	});
}

module.exports = addLog;
