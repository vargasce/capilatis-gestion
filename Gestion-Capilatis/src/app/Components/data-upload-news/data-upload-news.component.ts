import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DateService } from 'src/app/Core/services/dates/date.service';

@Component({
  selector: 'app-data-upload-news',
  templateUrl: './data-upload-news.component.html',
  styleUrls: ['./data-upload-news.component.scss']
})
export class DataUploadNewsComponent implements OnInit {

      @Output() dataupload = new EventEmitter<any>();
      @ViewChild('date') date : string;
      @ViewChild('detail') detail : string;

    constructor(
        public dateservice : DateService,
    ) { }

    ngOnInit(): void {

    }


  /** EVENT EMITTER
   * @observations Envio la informacion de la data al padre
   */
    uploadEvent(){
        this.dataupload.emit( this.buildDataNews() );

    }


    /**
     * @observations contruimos un objeto con la fecha y el detalle de la novedad a subir
     */
    buildDataNews(){
        let data = {
            'date' : this.dateservice.serializableDateFormat( this.date ),
            'detail' : this.detail
        };

        return data;
    }

}
