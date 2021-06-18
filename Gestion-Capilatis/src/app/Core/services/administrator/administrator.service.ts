import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../../Global';
import { AdministratorModel } from '../../models/administrator/administrator.model';


@Injectable({
	providedIn: 'root'
})
export class AdministratorService {

    public url:string;
    public administratorModel : AdministratorModel;

    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService
        this.administratorModel = new AdministratorModel('','','','','','','','',0,'',true,'','','','',true,0);
    }
    
    /**  GET ADMINISTRADOR
     *  @Observations Consulto y me traigo la lista de administradores
     *  @param paginador - Puede ser cualquier cosa 
     *  @param path - Se recibe el path donde realizo la consulta
     */
    getAdministrador( paginador : any , path : string):Observable<any>{
        let headers ={ headers:Global.headers };
        
        return this._http.post( this.url + path, paginador , headers );
    }

    /**  EDIT ADMINISTRADOR
     * @Observations : Obtenemos datos de administrador.
     * @param id - id del administrador
     * @param path - Path donde realizo la consulta
     */
    editAdministrador( id : any, path : string ):Observable<any>{
        let headers ={ headers:Global.headers };
        return this._http.post( this.url + path, id , headers );
    }

    /** SET ADMINISTRADOR
     *  @Observations : Metodo que resuelve tanto nuevo administrador como
	 *   editar. Se debe indicar el tipo de accion para la peticion a la API.
     *  @param id : number en el caso de NEW manda un 0 ya que la API lo ignora
     *  @param data - 
     *  @param path - Path donde realiza la consulta
		 *  @param typeAction - indicamos accion a la API ( 'NEW' or 'UPDATE' )
     *  @param token - this.vUser.getToken()
     */
    setAdministrator( id: number, data : AdministratorModel, path : string, tipeAction : string, token : string ):Observable<any>{
        let headers ={headers:Global.headers };
				let send = {
					'date' : data,
					'tipe' : tipeAction,
					'token' : token,
					'id' : id.toString()
				};

        return this._http.post( this.url + path, send , headers );
        
    }


    /** LOGOUT ADMINISTRADOR
     * @observations envio a la API el ID del administrador para realizar el logout en la base de datos
     * @param id objeto { 'id' : id }
     * @param path path a la cual envio la consulta
     */
    logoutAdministrator(id: string, path : string){
        let headers = {headers:Global.headers};

        return this._http.post( this.url + path, { 'id' : id }, headers)
    }
    
    /** SET PERMITS
     * @observations Metodo para enviar a la API los distintos tipos de permisos
     * @param data permitsModel correspondiente 
     * @param path Path donde realizo la consulta
     * @param tipe de permits 'module', 'administrador', 'novedades', 'vacaciones', etc
     */
    setPermits( data : any, path : string):Observable<any>{
        let headers = {headers:Global.headers };

        return this._http.post( this.url + path,{'data':data}, headers);
    }
  
}
