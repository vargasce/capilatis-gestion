'use strict'

const con = require('../../DB-connect/connectdb');
const custom = require('../../Custom/funciones');
const usr = require('../Session/Session');
const log = require('../../Custom/logs');

const controller = {

	/** OBTENER LISTA DE EMPLAEDOS, PAGINADO CON '../../Custom/funciones.js' **/
	getListEmploye: ( req, res ) => {

		custom.customGrid( req, `SELECT * FROM dbnomina `, `WHERE activo = ${req.body.statusList}` ).then( (result) =>{
			return res.status(200).send(result);
		}).catch( (error) =>{
			return res.status(200).send(error);
		});

	},

	/** OBTEBER EMPLEADO POR LEGAJO **/
	getEmploye : ( req, res ) =>{

		custom.getSqlForId( req, 'dbnomina', 'id_legajo', req.body.legajo ).then( (result) =>{
			return res.status(200).send(result);
		}).catch( (error) =>{
			return res.status(200).send(error);
		});

	},

	/** INSERTAR EMPLEADO **/
	setEmploye : ( req, res ) => {

		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			if( decode ){
				
				switch( req.body.tipe ){

					case 'NEW':

							let sqlInsert = getSqlInsertEmployee( req.body.date, decode.obj[0].nombre +'-'+ decode.obj[0].apellido );

							con.insert( sqlInsert , ( error, result ) =>{
								if( error == '' ){

									log( 'Nuevo empleado', req.originalUrl, req.body.token );
									return res.status(200).send({ 'error' : '', 'Resulset' : result, 'token' : usr.getSession( decode.obj[0] ) });
								}else{

									log( 'Erro en alta', req.originalUrl, req.body.token );
									return res.status(200).send({ 'error' : `Error al realizar la consulta : ${error}.` });
								}
							});

						break;

					case 'UPDATE':

						let sqlUpdate = `UPDATE dbnomina SET ${getSqlUpdateEmployee(req.body.date, decode.obj[0].nombre +'-'+ decode.obj[0].apellido) } WHERE id_legajo = ${req.body.date.id_legajo} ;`;

						con.update( sqlUpdate, ( error, result ) =>{
							if( error == '' ){

								log( 'Actualiza empleado', req.originalUrl, req.body.token );
								return res.status(200).send({ 'error' : '', 'Resulset' : 'OK' , 'token' : usr.getSession( decode.obj[0] )});
							}else{

								log( 'Error en actualiza empleado', req.originalUrl, req.body.token );
								return res.status(200).send({ 'error' : `Error al realizar la consulta : ${error}` });
							}
						});
						 
						break;
				}

			}else{

				log( 'Error de token', req.originalUrl, req.body.token );
				return res.status(200).send({ 'error' : `Error en session : ${error}` });
			}
		});

	},
	
	/** RETORNO ULTIMO NUMERO DE LEGAJO **/
	getFileEmploye : ( req, res ) =>{

		usr.getUserValidate( req.body.token, ( error, decode ) =>{
			if( decode ){
				con.select( 'SELECT max(id_legajo) AS newFile from dbnomina ;', ( error, result ) =>{
					if( error == '' ){
						return res.status(200).send({ 'error' : '', 'Resulset' : result[0] , 'token' : usr.getSession( decode.obj[0] ) });
					}else{
						return res.status(500).send({ 'error' : `Error al realizar la peticion : ${error}.` });
					}
				});
			}else{
				return res.status(200).send({ 'error' : `Error en la session : ${error}` });
			}
		});

	}

};

module.exports = controller;


/** OBTENER DATOS SQL INSERT 
 * @Observations : Obtenemos datos sql insert de dbnomina en formato de string
 * @param data : Object => datos del request.
 * @returns sql : string.
 */ 
const getSqlInsertEmployee = ( data, usuario_update ) =>{

	let sql = `INSERT INTO dbnomina ( id_legajo, nombre, cuil, fecha_ingreso, fecha_nacimiento , activo , fecha_egreso, categoria , mail , 
									  art , poliza , foto , alta_afip , foto_dni , foto_dnidso , cert_cuil , calle , numero , piso , localidad ,
									  provincia , codp , telefono , celular , usuario_carga , fecha_carga , usuario_update , fecha_update , orden ,
									  presentismo , almuerzo , t_almuerzo , hsextra , t_hsextra , premio , t_premio , sector , grupo , o_social ,
									  jefe , osexcedente , motivo , observaciones , plan , vacaciones , viaticos , tcelular , cursos , convenio , id_sector ,
									  id_grupo , id_o_social, id_almuerzo , id_categoria , id_hsextra , id_premio,id_jefe ) `;

	let fecha = new Date();
	let dateNow = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()}`;

		sql += ` VALUES ( '${data.id_legajo}' ,
										  '${data.nombre}' , 
											'${data.cuil}' ,
											'${data.fecha_ingreso}' ,
											'${data.fecha_nacimiento}' ,
											${1} ,
											'${dateNow}' , 
											'${data.categoria}' ,
											'${data.mail}' ,
											'${data.art}' , 
											'${data.poliza}' ,
											'${data.foto}' ,
											'${data.alta_afip}' ,
											'${data.foto_dni}' ,
											'${data.foto_dnidso}' ,
											'${data.cert_cuil}' , 
											'${data.calle}' , 
											'${data.numero}' ,
											'${data.piso}' ,
											'${data.localidad}' ,
											'${data.provincia}' ,
											'${data.codp}' ,
											'${data.telefono}' ,
											'${data.celular}' ,
											'${data.usuario_carga}' ,
											'${dateNow}' ,
											'${usuario_update}' ,
											'${data.fecha_update}' ,
											${0} ,
											${data.presentismo} ,
											${data.almuerzo} ,
											'${data.t_almuerzo}' ,
											${data.hsextra} ,
											'${data.t_hsextra}' ,
											${data.premio} ,
											'${data.t_premio}' ,
											'${data.sector}' ,
											'${data.grupo}' ,
											'${data.o_social}' ,
											'${data.jefe}' ,
											${data.osexcedente} ,
											'${data.motivo}' ,
											'${data.observaciones}' ,
											'${data.plan}' ,
											${data.vacaciones} ,
											${data.viaticos} ,
											${1} ,
											${data.cursos} ,
											'${data.convenio}' , 
											${parseInt(data.id_sector)} ,
											${parseInt(data.id_grupo)} ,
											${parseInt(data.id_o_social)} ,
											${data.id_almuerzo} ,
											${data.id_categoria} ,
											${data.id_hsextra} ,
											${data.id_premio} ,
											${parseInt(data.id_jefe)}
											);`;
		return sql;
}


/** OBTENER STRING SQL UPDATE.
 * @Observations : Arma string ( key : value ) para enviar a la 
 * base de datos.
 * @param data : Object => datos del request.
 * @returns sql : string => string sql update.
 * fecha_carga = '${data.fecha_carga}' La fecha de carga solo se debe de ingresar en el alta de empleado.
 * fecha_egreso = '${fechadepaso}' La fecha de egreso solo se carga cuando se da de baja un empleado

 */ 
const getSqlUpdateEmployee = ( data, usuario_update = '' ) =>{

	let fecha = new Date();
	//let dateNow = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()}`;
	let dateNow = `${fecha.getDay()}-${fecha.getMonth()}-${fecha.getFullYear()}`;

	console.log(dateNow);
	let sql = `id_legajo = '${data.id_legajo}',
						 nombre = '${data.nombre}', 
						 cuil = '${data.cuil}',
						 fecha_ingreso = '${data.fecha_ingreso}',
						 fecha_nacimiento = '${data.fecha_nacimiento}', 
						 activo = ${data.activo},
						 categoria = '${data.categoria}',
						 mail = '${data.mail}', 
						 art = '${data.art}',
						 poliza = '${data.poliza}',
						 alta_afip = '${data.alta_afip}',
						 foto_dni = '${data.foto_dni}',
						 foto_dnidso = '${data.foto_dnidso}',
						 cert_cuil = '${data.cert_cuil}',
						 calle = '${data.calle}',
 						 fecha_carga = '${dateNow}',
						 numero = '${data.numero}',
						 piso = '${data.piso}',
						 localidad = '${data.localidad}',
						 provincia = '${data.provincia}',
						 codp = '${data.codp}', 
						 telefono = '${data.telefono}',
						 celular = '${data.celular}',
						 usuario_carga = '${data.usuario_carga}',
						 usuario_update = '${usuario_update}',
						 fecha_update = '${data.fecha_update}',
						 orden = ${0}, 
						 presentismo = ${0},
						 almuerzo = ${0},
						 t_almuerzo = '${data.t_almuerzo}',
						 hsextra = ${0},
						 t_hsextra = '${data.t_hsextra}',
						 premio = ${0},
						 t_premio = '${data.t_premio}',
						 sector = '${data.sector}',
						 grupo = '${data.grupo}',
						 o_social = '${data.o_social}',
						 jefe = '${data.jefe}', 
						 osexcedente = ${0},
						 motivo = '${data.motivo}',
						 observaciones = '${data.observaciones}',
						 plan = '${data.plan}',
						 vacaciones = ${0},
						 viaticos = ${0},
						 tcelular = ${0},
						 cursos = ${0},
						 convenio = '${data.convenio}',
						 id_sector = ${data.id_sector},
						 id_grupo = ${data.id_grupo},
						 id_o_social = ${data.id_o_social},
						 id_jefe = ${data.id_jefe}`;
						 //foto = '${data.foto}',

	return sql;
}
