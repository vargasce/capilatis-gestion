
// FUNCIONES CUSTOM PARA EL SISTEMA
const con = require('../DB-connect/connectdb');
const usr = require('../Controllers/Session/Session');


/** PAGINADOR
 * @Observations : Paginador realiza la tarea de retorna las siguientes paginas
 * a mostrar de una grilla dependiendo lo solicitado. Muestra hasta 20 tuplas.
 *
 *  @param req : request de la solicitud del controlador
 *  @returns : 
 */

const paginador = ( req ) => {
	
	let actual = parseInt( req.body.pag );
	let inicioPagina = 1;
	let finalPagina = 15;
	let totalPagina = 15; // ESREDUNDANTE, PERO LO DEJO POR SI A FUTURO SE DECIDE ELEGIR AL USUARIO LA 
	//CANTIDAD DE PAGINAS.
	switch ( req.body.event ){
		case "next" : 
			inicioPagina = ( parseInt( req.body.pag ) * totalPagina ) - totalPagina;
		break;
		case "back":
			if ( parseInt( req.body.pag ) > 1 ){
				inicioPagina = ( parseInt( req.body.pag ) * totalPagina ) -  totalPagina ;
			}else{
				inicioPagina = 0 ;
				actual = 1;
			}
		break;
	}

	return {
		inicio : inicioPagina,
		final : finalPagina,
		pagActual : actual
	}
}


/** CUSTOM GRID PAGINATOR
 * @Observations : Armo grilla custom.
 * @param : req => Object datos de la solicitud (request).
 * @param : sql => String sql de la consulta a la tabla correspodiente.
 * @param : where => String subquery para la consulta. ( no obligatorio )
 * @returns : Promise => Call Back ( resolve = Object or reject = Object  ).
 */ 
const customGrid = ( req, sql, where = null ) =>{
	return new Promise ( (resolve, reject ) =>{

		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			if( decode ){
				let countTuplas, countPag;
				const dataPaginacion = paginador(req);
						
				let sqlConsult = '';
				if( where ){
					sqlConsult = sql + where+' ;';
				}else{
					sqlConsult = sql;
				}

				con.select( sqlConsult, ( error, result ) =>{

					if( error == '' ){

						countTuplas = result.length;
						countPag = Math.ceil( ( countTuplas / 15  ) );

						if( dataPaginacion.pagActual <= countPag && dataPaginacion.pagActual >= 0 ){

							let sqlSend = '';
							if( where ){
								sqlSend = sql+ where +' LIMIT '+ dataPaginacion.inicio+' ,'+ dataPaginacion.final+';';
							}else{
								sqlSend = sql+' LIMIT '+ dataPaginacion.inicio+' ,'+ dataPaginacion.final+';';
							}
						
							con.select( sqlSend, ( error, result ) =>{
								if( error == '' ){
									if ( result.length > 0 ){
										resolve({'error' : '', 'Resultset' : result, 'count' : result.length, 'pag' : countPag, 'cantTuplas' : countTuplas, 'actual' : dataPaginacion.pagActual, 'token' : usr.getSession(decode.obj[0]).token });
									}else{
										reject({'error' : 'No list'});
									}
								}else{
									reject({'error' : `Error en la consulta listuser (fuera de rango) : ${ error }` });
								}
							});

						}else{
							reject({ 'error' : 'Solicitud fuera de rango.' });
						}

				}
					
			});

			}else{
				reject({ 'error' : `Error en session : ${ error }`, 'sessionFail' : 'true' });
			}

		});

	});

};


/** GET SQL FOR ID
 * @Observations : Obtenemos consulta a la base de datos, filtrado por id.
 * @param : req => Object datos de la solicitud (request).
 * @param : tabla => String Nombre de la tabla.
 * @param : campo => String Campo que se va a filtrar.
 * @param : id => String Identificador.
 * @returns : Promise => Call Back ( resolve = Object or reject = Object  ).
 */ 
const getSqlForId = ( req, table, field, id ) =>{
	return new Promise( ( resolve, reject ) =>{

		usr.getUserValidate( req.body.token, ( error, decode ) =>{

			if( decode ){
				
				let sqlSend = `SELECT * FROM ${table} WHERE ${field} = ${id} ;`;

				con.select( sqlSend, ( error, result )=>{
					if (error == ''){
						if( result.length > 0 ){
							resolve({'error' : '', 'Resulset' : result, 'token' : usr.getSession( decode.obj[0] ).token });
						}else{
							reject({'error' : 'No Empleado'});
						}
					}else{
						reject({'error' : 'Error en la consulta getEmpleado'});
					}
				});

			}else{
				reject({ 'error' : 'Error de session : '+error, 'sessionFail' : 'true' });
			}

		});

	});

}

module.exports = {
	paginador : paginador,
	customGrid : customGrid,
	getSqlForId : getSqlForId
}
