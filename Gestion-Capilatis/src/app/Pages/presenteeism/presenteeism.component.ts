import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresenteeismModel } from 'src/app/Core/models/dbpresenteeism/presenteeism.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { NoveltiesService } from 'src/app/Core/services/novelties/novelties.service';
import { StorageService } from '../../Core/services/storage/storage.service';


@Component({
  selector: 'app-presenteeism',
  templateUrl: './presenteeism.component.html',
  styleUrls: ['./presenteeism.component.scss'],
  providers : [ NoveltiesService]
})
export class PresenteeismComponent implements OnInit {

    public dataModal : any = {};
    public presenteeismModel : PresenteeismModel;
    
    constructor(
      public storage : StorageService,
      public dateservice : DateService,
      public _noveltiesService : NoveltiesService,
      private navigation : Router,


  ) { 
      this.presenteeismModel = new PresenteeismModel(true,'','', new Date(), new Date(), new Date() );
  }

  ngOnInit(): void {
  }



  /**
   * 
   * @param data <presenteeismModel>
   */    
  newPresenteeism( data : PresenteeismModel): void{
      if ( this.storage.getCurrentSession() != null ){
          this._noveltiesService.setNovelties( data, 'path correspondiente', this.storage.getCurrentToken(), 'presenteeism' ).subscribe(
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



  /** EVENT PRESENTEEISM CHILD
   * @observations 
   * @param presenteeismModelChild <presenteeismModel> 
   */
  eventpresenteeismChild( presenteeismModelChild : PresenteeismModel ){
      this.presenteeismModel = presenteeismModelChild;
      this.newPresenteeism( this.presenteeismModel );
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
