const custom = require('../../Custom/funciones');
const con = require('../../DB-connect/connectdb');
const usr = require('../../Controllers/Session/Session');

const controller = { 

	/** LIST LOGS
	 * @Observations : Retorna lista de logs paginado.
	 */ 
	listLog : ( req, res ) =>{

		let sql = `SELECT log.id_user AS id_user, admin.usuario AS name_user, DATE_FORMAT(log.fecha, "%Y-%m-%d") AS fecha, log.hora AS hora, log.Observacion AS Observacion, log.funcion AS funcion 
									 FROM dblog AS log 
									 INNER JOIN administrador AS admin 
									 ON log.id_user = admin.id `;
		
		custom.customGrid( req, sql, null).then( (result) =>{  
			return res.status(200).send(result);
		}).catch( (error) => {
			return res.status(200).send(error);
		});	

	},

	/** FILTRO LOGS
	 * @Observations : Metodo para realizar filtros de logs, para ello precisamos de tres datos
	 * Desde, Hasta y usuario, en este caso puede variar si existe rango o solo usario.
	 */ 
	filterLogs : ( req, res ) =>{
		
		let sql = '';
		let user = req.body.filter.user;
		let since = req.body.filter.since;
		let until = req.body.filter.until;

		if( user != '' && since != '' && until != '' ){
			sql = `SELECT admin.id, admin.usuario, log.id, log.id_user, DATE_FORMAT(log.fecha, "%Y-%m-%d") AS fecha, log.Observacion, log.hora, log.funcion 
						 FROM dblog as log	
						 INNER JOIN administrador as admin  
						 ON admin.id = ${user} WHERE log.fecha 
						 BETWEEN cast('${since}' AS DATE) AND CAST('${until}' AS DATE);`

		}else if( user != '' && since == '' && until == '' ){
			sql = `SELECT log.id, log.id_user, DATE_FORMAT(log.fecha, "%Y-%m-%d") AS fecha, log.Observacion, log.hora, log.funcion FROM dblog AS log WHERE log.id_user = ${user} ;`;
		}else if( user == '' && since != '' && until != '' ){
			sql = `SELECT log.id, log.id_user, DATE_FORMAT(log.fecha, "%Y-%m-%d") AS fecha, log.Observacion, log.hora, log.funcion FROM dblog AS log WHERE log.fecha BETWEEN   cast('${since}' AS DATE) AND CAST('${until}' AS DATE);`;
		}

		usr.getUserValidate( req.body.token, ( errorDecode, decode )=>{
	
			if( decode ){

				con.select( sql, ( error, result ) =>{
					if( result ){
						return res.status(200).send({ 'error' : '', 'Resultset' : result });
					}else{
						return res.status(200).send({ 'error' : `Error en la consulta : ${error}` });
					}
				});

			}else{
				return res.status(200).send({ 'error' : `Error, token vencido : ${errorDecode}`, 'sessionFail' : 'true' });
			}

		});

	}

};

module.exports = controller;

