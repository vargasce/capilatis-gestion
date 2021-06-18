import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from '../../Global';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

	private url : string;

	constructor(
		private _http : HttpClient,

	){
		
		this.url = Global.urlService;
	}


	/** SEARCH CUSTOM DESCRIPTION
	 * @Observations : Solicita datos por descripcion.
	 * @param data : Object => datos de ka solicitud.
	 * @param path : string => ruta del controlador.
	 * @returns Object : Observable => promise http.
	 */
	searchCustomDescription ( data : any, path : string ):Observable<any>{
    let headers ={ headers:Global.headers };
		return this._http.post( this.url + path, data, headers );
	}

}
