import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../Core/services/storage/storage.service';
import { HelpService } from '../../Core/services/help/help.service';
import { Paginador } from 'src/app/Core/Custom/paginador';
import { SearchService } from 'src/app/Core/services/search/search.service';
import { DateService } from '../../Core/services/dates/date.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers : [ HelpService, SearchService ]
})
export class LogsComponent implements OnInit {

    public headersList = ['Id Usuario', 'Usuario' ,'Fecha', 'Hora' , 'Observacion' , 'Funcion' ];
    public tabla : any = {};
    public optionsTable = { 'edit' : false, 'delete' : true};
		public paginaActual : string;
    public paginasTotales : string;
    public dataModal : any = {};
    public until : Date;
    public since : Date;
    constructor(
          public _helpservice : HelpService,
          public storage : StorageService,
          private paginador : Paginador,
          public _searchService : SearchService,
          public dateservice : DateService
    ) {
        this.paginaActual = '1';
        this.pagesEvent().nextPages( this.paginaActual );
    }
    
    
    ngOnInit(): void {
    }


		 pagesEvent(){
				return { 
						 nextPages : (pag : any) => {
								this.paginador.changePageCustom(pag, 'next','logs', (data:any ) => {
                  this.builGridData(data.Resultset , this.headersList, this.optionsTable, data.actual, data.cantTuplas, data.pag);
                  this.paginasTotales = data.pag;
                });
						 },
						 backPages : (pag : any) => {
								this.paginador.changePageCustom(pag,'back','logs',(data:any) => {
								this.builGridData(data.Resultset, this.headersList, this.optionsTable, data.actual, data.cantTuplas, data.pag);
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

     nextPages( event : any ){
       if( !(this.paginasTotales == this.paginaActual)){
        this.paginaActual = (parseInt( this.paginaActual) + 1).toString();
        this.pagesEvent().nextPages( parseInt(this.paginaActual ));
       };

     }
  
     backPages( event : any ){
       if ( parseInt( this.paginaActual) - 1 <= 1){
          this.paginaActual = '1';
       }else{
          this.paginaActual = (parseInt( this.paginaActual) -1).toString();
       }
          this.pagesEvent().backPages( parseInt( this.paginaActual));
     }

      /** EVENTO COMPONENTE MODAL
     * @observvations : evento disparador del modal-custom
     * @param message Mensaje a mostrar;
     * @param Input : false / true muestra el form de inicio de session o lo oculta
     */
      eventModal( message : string, input : boolean){
          this.dataModal = { 'message' : message, 'IsShowModal' : true, 'IsShowInput' : input };
      }




      /** EVENT SEARCH BY PERIOD CHILD (FALTA IMPORTAR COMPONENTE EL HTML)
       * @observations obtengo el periodo de busqueda que posteriormente vamos a utilizar en el search
       * @param data { 'since' : since(Date) , 'until': until(Date) }
       */
      searchPeriod( data : any){
          this.until = data.until;
          this.since = data.since;
          this.searchDescription( 0 );
      }

      /** EVENT EMITTER SEARCH FOR NAME
      * 
      */
      searchDescription( user : number ){
          if ( user.toString() == ''){
            
              this.pagesEvent().nextPages('1');

          }else{
            
              let send = {
                  'token' : this.storage.getCurrentToken(),
                  'filter' : {
                      'since' : this.dateservice.serializableDateFormat( this.since.toString() ),
                      'until' : this.dateservice.serializableDateFormat( this.until.toString() ),
                      'user' : user
                  }
              }
        
              this._searchService.searchCustomDescription( send, 'filterlogs' ).subscribe(
                response =>{
                    this.builGridData( response.Resultset, this.headersList , this.optionsTable, 1, 1, 1 );
                },
                error =>{
                    console.table( error );
                }
              );
          }
    
        
    
      }



}
