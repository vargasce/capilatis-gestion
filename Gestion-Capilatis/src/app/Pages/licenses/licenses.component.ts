import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LicensesModel } from 'src/app/Core/models/dblicenses/licenses.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { NoveltiesService } from 'src/app/Core/services/novelties/novelties.service';
import { StorageService } from 'src/app/Core/services/storage/storage.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss'],
  providers: [ NoveltiesService ],
})
export class LicensesComponent implements OnInit {

    public dataModal : any = {};
    public licensesModel : LicensesModel;

    constructor(
        public  storage : StorageService,
        public dateservice : DateService,
        public _noveltiesService : NoveltiesService,
        private navigation : Router,

    ) { 
        this.licensesModel = new LicensesModel(0,'',true,'','', new Date(), new Date(), new Date() );
    }

    ngOnInit(): void {
    }

    newLicenses( data : LicensesModel): void{
        if ( this.storage.getCurrentSession() != null){
            this._noveltiesService.setNovelties( data, 'path correspondiente', this.storage.getCurrentToken(), 'licenses').subscribe(
              response =>{
                if( response.error == '' ){
                  this.eventModal('Carga Exitosa', false);
                  this.storage.updateToken( response.token );
              }else{
                  this.eventModal(response.error, false);
              }
          },
          error=>{
              if( error.error.sessionFail == 'true' ){
                  this.eventModal('Session caducada.', true);
              }else{
                  this.eventModal(`Si ve este cartel por favor comunicarse con soporte de sistemas.`, false);
              }
          }
      );
      }else{
          this.navigation.navigate(['/']);
      }
  }


    /**
     * 
     * @param licensesModelChild 
     */
    eventLicensesChild( licensesModelChild : LicensesModel ):void{
        this.licensesModel = licensesModelChild;
        this.newLicenses( this.licensesModel );
    }

    /** EVENTO COMPONENTE MODAL
    * @observvations : evento disparador del modal-custom
    * @param message Mensaje a mostrar;
    * @param Input : false / true muestra el form de inicio de session o lo oculta
    */
    eventModal( message : string, input : boolean){
        this.dataModal = { 'message' : message, 'IsShowModal' : true, 'IsShowInput' : input };
    }

    eventNews( event: any){
        //No se para que sirve        
    }
    

}
