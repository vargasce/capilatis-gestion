
/** CONFIGURACION DE RUTAS
 * @Observations : vamos a crear las rutas de la api, para ello debemos tener previemente 
 *  cargado los controladores que van a responder a ellos.
 */

const express = require('express');
const Login = require('../Controllers/login');
const Empleado = require('../Controllers/Empleado/empleado');
const Administrator = require('../Controllers/Administrator/Administrator');
const Upload = require('../Controllers/UploadGoDown/upload');
const GoDown = require('../Controllers/UploadGoDown/godown');
const Help = require('../Controllers/Help/help');
const Search = require('../Controllers/Search/search');
const Logs = require('../Controllers/Logs/Logs');

// SERVICIO PARA LAS RUTAS
const router = express.Router();

//POR EL MOMENTO UTLIZO OTRA MANERA DE GUARDAR ARCHIVOS. (Me limita siertas funcionabilidades)
//const multiparty = require('connect-multiparty');
//const multipartMiddeleware = multiparty({uploadDir: './uploads'});

router.post('/login', Login.getSession );
router.post('/close', Login.closeSession );
router.post('/listUser', Empleado.getListEmploye );                         // ESTE EN REALIDAD ES LISTA DE EMPLADO
router.post('/getempleado', Empleado.getEmploye );                          // RETORNA REGISTRO DE EMPLEADO
router.post('/setemployee', Empleado.setEmploye )                           // INSERTA O ACTUALIZA EMPLEADO  
router.post('/setadministrator', Administrator.setAdministrator );  			  // INSERTA O ACTUALIZA ADMINISTRADOR
//router.post('/uploadImg/:id',multipartMiddeleware, Upload.uploadImagen ); // Justo aca se ejecuta el multiparty ( En desuso, se comento mas arriba )
router.post('/uploadImg/:id', Upload.uploadImagen );                        // Justo aca se ejecuta el multiparty
router.post('/uploadFile/:id/:token', Upload.uploadFile ); 									// SUBIR ARCHIVOS ( PDF , DOCS )
router.get('/godownImg/:image/:id', GoDown.getImageFile); 									// OBTENEMOS IMAGEN
router.post('/getFileEmploye', Empleado.getFileEmploye);                    // RETORNA ULTIMO LEGAJO
router.post('/help', Help.getHelp); 																			  // AYUDA DE DATOS PARA PANTALLAS / O DATOS EXTRAS
router.post('/search', Search.columnString );                            		// CONTROLADOR PARA FILTROS.
router.post('/logs', Logs.listLog ); 																				// LISTA LOGS DEL SISTEMA, SEARCH.
router.post('/getAdministrator', Administrator.getAdministrator );  				// OBTENEMOS ADMINISTRADOR POR ID
router.post('/filterlogs', Logs.filterLogs);

module.exports = router;

