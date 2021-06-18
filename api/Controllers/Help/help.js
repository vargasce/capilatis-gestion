
const con = require('../../DB-connect/connectdb');

const controller = {

	getHelp : ( req, res ) => {
		
		switch( req.body.action ){
			case 'sector' : 
				
				getHelpQuery(  '*', 'dbsector', res );
			
				break;
			case 'grupo' :

				getHelpQuery(  '*', 'dbgrupo', res );
		
				break;
			case 'obrasocial' :
				
				getHelpQuery(  '*', 'dbobrasocial', res);
	
				break;
			case 'logs' : 
				
				let sql = `SELECT log.id_user AS id_user, admin.usuario AS name_user, DATE_FORMAT(log.fecha, "%Y-%m-%d") AS fecha, log.hora AS hora, log.Observacion AS Observacion, log.funcion AS funcion 
									 FROM dblog AS log 
									 INNER JOIN administrador AS admin 
									 ON log.id_user = admin.id ;`;

				con.select( sql, ( error, result ) =>{
					if( !error ){
						return res.status(200).send({ 'error' : '', 'Resultset' : result });
					}else{
						return res.status(500).send({ 'error' : `Error en la peticion : ${error}` });
					}
				});


				break;
			case 'activos' : 

				getHelpQuery( 'id, usuario, nombre, apellido, DATE_FORMAT(fecha_activo,"%Y-%m-%d") AS fecha_activo, hora_activo, os_activo, plataform_activo, activo, correo ', 'administrador', res );

				break;
			case 'premio' : 

				getHelpQuery( 'id, descripcion', 'dbpremio', res );

				break;
			case 'superiorjefe' : 

				getHelpQuery( 'id, nombre AS descripcion', 'administrador', res, 't_jefe = 1' );
				
				break;
			case 'almuerzo' : 

				getHelpQuery( 'id, descripcion', 'dbalmuerzo_p', res );

				break;
			case 'categoria' : 

				getHelpQuery( '*', 'dbcategoria', res );

				break;
			case 'hsextra' : 

				getHelpQuery( 'id, descripcion', 'dbhsextra_p', res );

				break;
		}
	}

};

/** SIMPLE QUERY
 * @Observations : Como son consultas sencillas de ayuda, uso esta funcion para simplificar codigo
 * y limpieza del mismo.
 * @param atributo : string => Atributos de la consulta.
 * @param base : string => Tabla a donde se realiza la consulta.
 * @param res  : Object => response de la api.
 */ 
const getHelpQuery = ( atributo, base, res, where = null ) =>{
	sql = '';
	if( where ){
		sql = `SELECT ${atributo} FROM ${base} WHERE ${where} ;`;
	}else{
		sql = `SELECT ${atributo} FROM ${base} ;`;
	}

	con.select( sql, ( error, result ) =>{
			if( !error ){
				return res.status(200).send({ 'error' : '', 'Resultset' : result });
			}else{
				return res.status(500).send({ 'error' : `Error en la peticion : ${error}` });
			}
	});

}

module.exports = controller;
