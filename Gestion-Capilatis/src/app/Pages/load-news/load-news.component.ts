import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { NoveltiesService } from 'src/app/Core/services/novelties/novelties.service';
import { StorageService } from 'src/app/Core/services/storage/storage.service';
import { NewsModel } from '../../Core/models/dbnews/news.model';

@Component({
  selector: 'app-load-news',
  templateUrl: './load-news.component.html',
  styleUrls: ['./load-news.component.scss'],
  providers: [ NoveltiesService ]
})
export class LoadNewsComponent implements OnInit {

    public dataModal: Object;
    public newsModel : NewsModel;
    
    constructor(
        public storage : StorageService,
        public dateservice : DateService,
        public _noveltiesService : NoveltiesService,
        private navigation : Router,
    ) { }

    ngOnInit(): void {
    }

    /** NEW NEWS
     * 
     * @param data <NewsModel>
     */    
     newNews( data : NewsModel): void{
      if ( this.storage.getCurrentSession() != null ){
          this._noveltiesService.setNovelties( data, 'path correspondiente', this.storage.getCurrentToken(), 'news' ).subscribe(
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



  /** EVENT News CHILD
   * @observations 
   * @param awardModelChild <NewsModel> 
   */
  eventAwardChild( NewsModelChild : NewsModel ){
      this.newsModel = NewsModelChild;
      this.newNews( this.newsModel );
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
