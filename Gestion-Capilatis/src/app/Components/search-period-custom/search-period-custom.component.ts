import { Component, OnInit, Input, ViewChild, EventEmitter, Renderer2, Output, ElementRef } from '@angular/core';
import { DateService } from '../../Core/services/dates/date.service';

@Component({
  selector: 'app-search-period-custom',
  templateUrl: './search-period-custom.component.html',
  styleUrls: ['./search-period-custom.component.scss']
})
export class SearchPeriodCustomComponent implements OnInit {

  @Input('period') titlePeriod: string;
  @ViewChild('sinceForm') sinceForm : ElementRef;
  @ViewChild('untilForm') untilForm : ElementRef;
  @Output() searchPeriod = new EventEmitter<any>();

  @ViewChild('since') since : Date;
  @ViewChild('until') until :Date;


  constructor( 
      public dateService : DateService,
      public renderer : Renderer2,
   ) {  }

  ngOnInit(): void {
        // setTimeout( ()=>{
        //     this.eventError();
        // },360);
  }

  /** SEARCH EVENT
   * @observations envio un objeto contenedor de las DATES que conforman el periodo por el cual buscar
   */
  searchEvent(){      
     // if( this.validations() ) {   
          let send = {
              'since' : this.dateService.serializableDateFormat( this.since.toString() ),
              'until' : this.dateService.serializableDateFormat( this.until.toString() )
          };

          this.searchPeriod.emit( send )
    //  }
  }


  /** VALIDATIONS
   * @observations validaciones necesarias para el envio de la informacion a la API, en caso de no cumplirlas se pondra la clase 'border-error'
   */
  validations(){
      let continuo = true;
      if( this.since.toString() == ''){
          this.renderer.addClass( this.sinceForm.nativeElement, 'border-error')
          continuo = false
      };

      if( this.until.toString() == ''){
          this.renderer.addClass( this.untilForm.nativeElement, 'border-error')
          continuo = false
      };

      if ( this.dateService.dateComparator( this.since , this.until )){
          this.renderer.addClass( this.sinceForm.nativeElement, 'border-error');
          this.renderer.addClass( this.untilForm.nativeElement, 'border-error');
          continuo = false
      };

      return continuo
  }


  /** EVENT ERROR
   * @observations removemos la clase 'border-error' del input
   */
  eventError(){
      this.renderer.listen( this.sinceForm.nativeElement, 'change', ( event ) =>{
          this.renderer.removeClass( this.sinceForm.nativeElement, 'border-error')
      });
      this.renderer.listen( this.untilForm.nativeElement, 'change', ( event ) =>{
          this.renderer.removeClass( this.untilForm.nativeElement, 'border-error')
      });
  }

}
