'use strict'

const date = require('./dates');
const con = require('../DB-connect/connectdb');
 
const add = {

	/** ACTIVE
	 * @Observations : Agreamos a lista de activos al nuevo login realizado.
	 * @param data : Object => Dtos de la session.
	 */

	active : ( data ) =>{

		if( data.active ){
			let sql = `UPDATE administrador SET activo = ${data.active}, 
				      		           						  fecha_activo = '${date.getDateCurrentStringCustom()}',
												 						 	    hora_activo = '${date.getHourMinuteCurrent()}',
												 							    os_activo = '${data.os}',
											  						 	    plataform_activo = '${data.plataform}' 
																	    WHERE id = ${data.user} ; `;

			con.update( sql, ( error, result ) =>{
				if( error ){
					//console.table( `Update activo : ${JSON.stringify(result)}` );
					console.log( `Error in  "active" funcion activos, error : ${error} result : ${result}` );
				}

			});
		}
		
	},

	/** DISCONECT 
	 * @Observations : Desconectamos usuario, por lo tanto queda session inactiva,
	 * esto puede suceder tambien con un error de token.
	 * @param id_usuario : string => id del usuario que se desconecta.
	 * @returns boolean : ( TRUE or False ) true : exito, false : update error.
	 */ 
	disconect : id_usuario => {
	
		let sql = `UPDATE administrador SET activo = ${false} WHERE id = ${id_usuario} ; `;
		con.update( sql, ( error, result ) =>{ 
			
			if( error ){
				console.log('Error in "DISCONECT" funcion activos. Error : ' + error + ' result : ' + result );
				return false;
			}

			return true;
		});

	}

};

module.exports = add;
