import {Component, OnInit, Input, ViewChild, Output, EventEmitter, Renderer2} from '@angular/core';
import { DateService } from 'src/app/Core/services/dates/date.service';

@Component({
  selector: 'app-searchbyperiod-news',
  templateUrl: './searchbyperiod-news.component.html',
  styleUrls: ['./searchbyperiod-news.component.scss']
})
export class SearchbyperiodNewsComponent implements OnInit {

    @Input('period') titlePeriod: string;
    @Output() search = new EventEmitter<any>();

    public periodo : Date;

    constructor( 

        public dateservice : DateService,
        public renderer : Renderer2,

    ) {  }

    ngOnInit(): void {

    }

    /** EVENT EMITTER
     * @observations envio el Date al padre con el formato 1997 - 05
     */
    sendPeriod(){
        if ( this.periodo.toString() != ''){
            this.search.emit( this.dateservice.serializableDateFormat2( this.periodo ) );
        }
    }

}
