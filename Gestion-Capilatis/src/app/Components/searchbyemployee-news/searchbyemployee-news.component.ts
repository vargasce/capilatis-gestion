import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-searchbyemployee-news',
  templateUrl: './searchbyemployee-news.component.html',
  styleUrls: ['./searchbyemployee-news.component.scss']
})
export class SearchbyemployeeNewsComponent implements OnInit {

    @Output() search = new EventEmitter<any>();
    @ViewChild('inputNombre') nombrereference : string;
    @ViewChild('InputLegajo') legajoreference : string;

  constructor() { }

  ngOnInit(): void {

  }


    searchEvent(){
      this.search.emit(this.buildSendModel)
    }

    /** BUILD SEND MODEL
     * @observations construimos un objeto con el legajo y nombre para enviar al padre
     */
    buildSendModel():any{
        let send = {
            'name' : this.nombrereference,
            'legajo' : this.legajoreference
        };

        return send;
    }

}
