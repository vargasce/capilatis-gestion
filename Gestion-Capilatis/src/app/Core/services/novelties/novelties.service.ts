import { Injectable } from '@angular/core'; // parainjectar un componente
import { HttpClient } from '@angular/common/http'; //Para peticiones ajax
import { Observable } from 'rxjs/Observable';
import { Global } from '../../Global';

@Injectable()
export class NoveltiesService {

    public url:string;
  
    constructor (
        public _http:HttpClient
    ){
        this.url = Global.urlService;        
    }

    /** SET AWARD
     * @Observations REALIZAMOS CARGA DE PREMIO
     * @param data 
     * @param path Se recibe el path donde se realiza la petición
     * @param action : tipo de novedad a enviar { licenses, award, news, extra-hours, etc }
     */
    setNovelties(data : any, path : string, token : string, action : string):Observable<any>{
        var headers : any;
        headers ={headers: Global.headers };
        let send = {
            'data' : data,
            'token' : token,
            'action' : action,
        }
        return this._http.post(this.url + path, send, headers);
    }
    
}
