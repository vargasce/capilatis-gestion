'use strict'

const con = require('../../DB-connect/connectdb');
const usr = require('../Session/Session');

const controller = {
	
	/** SEARCH FOR COLUMN
	 * @Obserrvation : Realiza busqueda por patrones de string dentro de una column
	 * @param body : Object => { token, table, column, value }
	 */
	columnString : ( req, res ) =>{
		
		usr.getUserValidate( req.body.token,  ( error, decode ) =>{

			if( decode ){

				let sql = `SELECT * FROM ${req.body.table} WHERE ${req.body.column} LIKE '%${req.body.value}%' ;`;
				con.select( sql, ( error, result ) =>{

					if( error == '' ){						
						return res.status(200).send({ 'error' : '', 'Resultset' : result });
					}else{
						console.log( `Error en search funcion nombre : ${error} result : ${result}` );
						return res.status(500).send({ 'error' : `Error en search : ${error} result : ${result}` });
					}

				});

			}else{
				return res.status(500).send({ 'error' : `Error en token : ${error}` });
			}

		});

	}

};

module.exports = controller;
