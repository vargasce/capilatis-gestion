import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paginador } from '../../Core/Custom/paginador';
import { SearchService } from '../../Core/services/search/search.service';
import { StorageService } from '../../Core/services/storage/storage.service';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers : [ Paginador, SearchService, StorageService ]
})
export class ListUserComponent implements OnInit {

	public headersList = ['Legajo','Nombre','Cuil','Opciones'];
	public tabla : any = {};
	public optionsTable = { 'edit' : true , 'delete' : false };
	public ultimapagina: any;
	public dataModal : any = {}

  constructor(
		private navegacion : Router,
		private paginador : Paginador,
		private _searchService : SearchService,
		private storage : StorageService

  ) {
		this.pagesEnvet().nextPages('1');
  }

  ngOnInit(): void {
  }

	editEmpleado( legajo: string ){
		this.navegacion.navigate(['home/editempleado/'+legajo]);
	}

	pagesEnvet () {
		return {
			nextPages : (pag : any) => {
				this.paginador.changePage(pag,'next','listUser',1, (data: any) => {

					this.ultimapagina = data.pag;
					this.builGridData(data.Resultset, this.headersList, this.optionsTable, data.actual, data.cantTuplas, data.pag );
				});
			},
			backPages : (pag : any) => {
				this.paginador.changePage(pag,'back','listUser',1, (data: any) => {
					this.builGridData(data.Resultset, this.headersList , this.optionsTable, data.actual, data.cantTuplas, data.pag );
				});

			}
		}
	}

	builGridData( data : any, headers = null, options = null, paginaActual = null , cantidadTuplas = null, totalPaginas = null){
		this.tabla = {
			'list' : data,
			'cabeceraList' : headers,
			'opciones' : options,
			'paginaActual' : paginaActual,
			'cantidadPaginas' : cantidadTuplas,
			'totalPaginas' : totalPaginas
		}
	}

	nextPages(pagina: number ){
		if( !(pagina > this.ultimapagina)){
			this.pagesEnvet().nextPages(pagina);
		}
	}

	backPages(pagina: number ){
		this.pagesEnvet().backPages(pagina);
	}


	/** EVENT EMITTER SEARCH FOR NAME
	 * @Observations : Metodo disparado con keypress para la buscada/filtrado por nombre de empleado.
	 * @param value : string => valores para busqueda por patrones de letras.
	 */ 
	searchDescription( value : string ){

		if( value == '' ){

			this.pagesEnvet().nextPages('1');

		}else{
			
			let send = {
				'token' : this.storage.getCurrentToken(),
				'table' : 'dbnomina',
				'column' : 'nombre',
				'value' : value
			}

			this._searchService.searchCustomDescription( send, 'search' ).subscribe(
				response =>{
					this.builGridData( response.Resultset, this.headersList , this.optionsTable, 1, 1, 1 );
				},
				error =>{
					console.table( error );
				}
			);

		}	

	}

	        /** EVENTO COMPONENTE MODAL
     * @observvations : evento disparador del modal-custom
     * @param message Mensaje a mostrar;
     * @param Input : false / true muestra el form de inicio de session o lo oculta
     */
	eventModal( message : string, input : boolean){
		this.dataModal = { 'message' : message, 'IsShowModal' : true, 'IsShowInput' : input };
	}

	searchPeriod( hola : any){
		return hola;
	}
}


