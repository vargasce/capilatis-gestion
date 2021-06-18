import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OptionsModel }  from '../../models/options/options.model';
import { Global } from '../../Global';

@Injectable()
export class OptionsService {

    public url:string;
  
    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;        
    }

    /** GET OPTIONS
     * @observations CONSULTO A LA API Y OBTENGO LAS CONFIGURACIONES SELECCIONADA POR EL USUARIO 
     * @param id id_administrador
     * @param path path de la consulta
     * @returns <OptionsModel>
     */
    getOptions( id : string, path : string):Observable<any>{
        var headers : any;
        headers ={headers: Global.headers};

        return  this._http.post<OptionsModel>(this.url + path, id, headers);
    }

    /** SET OPTIONS
     * @Observations REALIZAMOS LA CARGA DE OPCIONES DE CADA USUARIO.
     * @param login Se envia un Model del tipo optionsModel
     * @param path Se recibe el path donde se realiza la petición
     */
    setOptions( id : string ,optionsModel : any, path : string, token : string):Observable<any>{
        var headers : any;
        headers ={headers: Global.headers };
        let send = {
            'id' : id,
            'data' :  optionsModel,
            'token' :  token
        };

        return this._http.post<OptionsModel>(this.url + path, send , headers);
    }
    
}