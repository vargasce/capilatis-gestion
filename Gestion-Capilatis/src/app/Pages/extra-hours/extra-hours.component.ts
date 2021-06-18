import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HsextraModel } from 'src/app/Core/models/dbhsextra/hsextra.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { NoveltiesService } from 'src/app/Core/services/novelties/novelties.service';
import { StorageService } from 'src/app/Core/services/storage/storage.service';

@Component({
  selector: 'app-extra-hours',
  templateUrl: './extra-hours.component.html',
  styleUrls: ['./extra-hours.component.scss'],
  providers : [ NoveltiesService ]
})
export class ExtraHoursComponent implements OnInit {

    public dataModal : any = {};
    public hsextraModel : HsextraModel;

    constructor(
        public storage : StorageService,
        public dateservice : DateService,
        public _noveltiesService : NoveltiesService,
        private navigation : Router,
    ) { }

    ngOnInit(): void {
    }

    newHsExtra( data : HsextraModel ){
        if ( this.storage.getCurrentSession() != null ){
            this._noveltiesService.setNovelties( data , 'path correspondiente', this.storage.getCurrentToken(), 'extra-hours').subscribe(
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

      /** EVENT EXTRA HOUR CHILD
     * @observations 
     * @param awardModelChild <HsextraModel> 
     */
         eventAwardChild( extrahoursModelChild : HsextraModel ){
          this.hsextraModel = extrahoursModelChild;
          this.newHsExtra( this.hsextraModel );
      }
  
  
  
          /** EVENTO COMPONENTE MODAL
       * @observvations : evento disparador del modal-custom
       * @param message Mensaje a mostrar;
       * @param Input : false / true muestra el form de inicio de session o lo oculta
       */
           eventModal( message : string, input : boolean){
            this.dataModal = { 'message' : message, 'IsShowModal' : true, 'IsShowInput' : input };
        }
  
    

}
