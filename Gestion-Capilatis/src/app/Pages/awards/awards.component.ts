import { Component, OnInit } from '@angular/core';
import { AwardsModel } from 'src/app/Core/models/dbawards/awards.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { StorageService } from 'src/app/Core/services/storage/storage.service';
import { NoveltiesService } from '../../Core/services/novelties/novelties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
  providers: [ NoveltiesService ]
})
export class AwardsComponent implements OnInit {


    public awardModel : AwardsModel;
    public dataModal : any = {};

    constructor(
        public storage : StorageService,
        public dateservice : DateService,
        public _noveltiesService : NoveltiesService,
        private navigation : Router,


    ) { 
        this.awardModel = new AwardsModel('',0, new Date(),'','', new Date() );
    }

    ngOnInit(): void {
    }



    /**
     * 
     * @param data <awardModel>
     */    
    newAward( data : AwardsModel): void{
        if ( this.storage.getCurrentSession() != null ){
            this._noveltiesService.setNovelties( data, 'path correspondiente', this.storage.getCurrentToken(), 'award' ).subscribe(
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



    /** EVENT AWARD CHILD
     * @observations 
     * @param awardModelChild <AwardsModel> 
     */
    eventAwardChild( awardModelChild : AwardsModel ){
        this.awardModel = awardModelChild;
        this.newAward( this.awardModel );
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
