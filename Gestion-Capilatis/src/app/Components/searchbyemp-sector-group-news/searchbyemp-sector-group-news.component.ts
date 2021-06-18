import { Component, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import { HelpService } from '../../Core/services/help/help.service';

@Component({
  selector: 'app-searchbyemp-sector-group-news',
  templateUrl: './searchbyemp-sector-group-news.component.html',
  styleUrls: ['./searchbyemp-sector-group-news.component.scss'],
    providers : [ HelpService ]
})
export class SearchbyempSectorGroupNewsComponent implements OnInit {


    @Output() search = new EventEmitter<any>();
      @ViewChild('sector') sector : string;
      @ViewChild('grupo') grupo : string;

    public selectgrupo : any;
    public selectsector : any;


  constructor(
      public _helpservice : HelpService,
  ) { }

  ngOnInit(): void {
      this.fieldSelectCall();
  }

    /** SEARCH EVENT
     * @Observations Envio de la data al padre
     */
    searchEvent(){
      this.search.emit(this.buildDataModel());

    }

    /** BUILD SEND MODEL
    * @observations construimos un objeto con el sector y grupo para enviar al padre
    */
    buildDataModel():any{
        let data = {
            'sector' : this.sector,
            'grupo' : this.grupo
        };

        return data;
    }

    
      /** FIELD SELECT CALL
       * @observations llamada a la API para rellenar los select correspondientes
       */
    async fieldSelectCall() {
        let grupo   = await this._helpservice.fieldHelp( { action : 'grupo'}, 'help' ).toPromise();
        let sector  = await this._helpservice.fieldHelp( { action : 'sector'}, 'help' ).toPromise();

        this.selectgrupo = grupo.Resultset;
        this.selectsector = sector.Resultset;
    }





}
