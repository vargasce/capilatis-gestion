'use strict'

const fs = require('fs');
const path = require('path');
const con = require('../../DB-connect/connectdb');
const usr = require('../Session/Session');


const controller = {

	uploadImagen : ( req, res ) => {
	
		if( req.files ){
			
			const legajoEmpleado = req.params.id;
			console.log('id_legajo : ', legajoEmpleado );
			const token = req.params.token;
			let filePath, fileSplit, fileName, extensionSplit, extension;

			getPlataform( token, ( plataform ) =>{

				if( plataform.plataform == 'Linux' ){
					filePath = req.files.image.path;
					fileSplit = filePath.split('/');
					fileName = fileSplit[2];
					extensionSplit = fileName.split('.');
					extension = extensionSplit[1];

				}else{

					filePath = req.files.image.path;					
					fileSplit = filePath.split('\\');
					fileName = fileSplit[fileSplit.length - 1];
					extensionSplit = fileName.split('.');
					extension = extensionSplit[1];

				}

				if( extension == 'jpg' || extension == 'png' || extension == 'gif' || extension == 'icon' ){

					upload( fileName, filePath, legajoEmpleado );

					let sql = 'UPDATE dbnomina SET foto = "'+fileName+'" WHERE id_legajo = "'+legajoEmpleado+'"'; 
					con.update( sql , ( error, result ) =>{
						if( result ){
							return res.status(200).send({ 'error' : '' });
						}else{
							return res.status(500).send({'error' : 'No se pudo subir la imagen : '+ error });
						}
					});
				}else{
					 fs.unlink(filePath, (err) =>{
						 return res.status(200).send({message : 'La extencion no es valida : ' + err});
					 });
				}

			});

		}else{
			return res.status(500).send({'error' : 'Error en la carga de datos.' });
		}

	},

	uploadFile : ( req,  res ) => {

		if( req.files ){

			const legajoEmpleado = req.params.id;
			const token = req.params.token;
			let filePath, fileSplit, fileName, extensionSplit, extension;

			getPlataform( token, ( plataform ) =>{
				if( plataform.plataform == 'Linux' ){
					filePath = req.files.files.path;
					fileSplit = filePath.split('/');
					fileName = fileSplit[2];
					extensionSplit = fileName.split('.');
					extension = extensionSplit[1];

				}else{

					filePath = req.files.files.path;					
					fileSplit = filePath.split('\\');					
					fileName = fileSplit[fileSplit.length - 1];
					console.log( fileName );
					extensionSplit = fileName.split('.');
					extension = extensionSplit[1];

				}

				if( extension == 'pdf' || extension == 'docs' || extension == 'json' || extension == 'txt' ){
					let file = req.files.file;

					upload( fileName, filePath, legajoEmpleado );

				} 

			});

		}else{
			return res.status(400).send({ 'error' : `No hay archivos seleccionados.` });
		}

	}

}


/** CARGAR FILE
 * @Observations : Funcion para realizar la subida de archivos en el servidor.En caso de no tener
 * una carpeta el usuario se le crea una, si no utiliza la misma para cargar los archivos.
 * @param fileName : string => Nombre del archivo.
 * @param filePath : blop =>  direccion de archivo binario.
 * @param folder : string => Nombre de la carpeta, numero de legajo de empleado.
 */ 
const upload = ( fileName , filePath, folder ) =>{

		try { fs.mkdirSync('./uploads/'+folder); } catch(e) { if ( e.code != 'EEXIST' ) throw e; }
		const is = fs.createReadStream(filePath);
		const os = fs.createWriteStream(`./uploads/${folder}/${fileName}`);

		is.pipe(os);

		is.on('end', ()=>{
			fs.unlinkSync(filePath);
		});

}

/** OBTENER PLATAFORMA
 * @Observations : obtenemos la plataforma de sistema operatico que esta usando el usuario.
 * @param id_legajo : string => numero de legajo del usuario al que se realiza la carga.
 * @param plataform : callback => retorna callback function con la consulta de la plataforma del user.
 */ 
const getPlataform =  ( token, plataform ) => {
	
	usr.getUserValidate( token, ( error, decode ) =>{
		if( decode ){

			con.select( `SELECT * FROM administrador WHERE id = ${decode.obj[0].id} ;`, ( error, result ) =>{

				if( !error ){
					if( result[0].activo == 1 ){
						plataform({ 'error' : '', 'plataform' : result[0].plataform_activo });
					}else{
						plataform({ 'error' : 'Inactive' });
					}
				}

			});

		}else{
			plataform({ 'error' : `Error de token : ${error}` });
		}
	});

}

module.exports = controller;
