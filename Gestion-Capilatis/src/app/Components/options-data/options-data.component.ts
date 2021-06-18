import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { OptionsModel } from 'src/app/Core/models/options/options.model';
import { StorageService } from 'src/app/Core/services/storage/storage.service';


@Component({
  selector: 'app-options-data',
  templateUrl: './options-data.component.html',
  styleUrls: ['./options-data.component.scss']
})
export class OptionsDataComponent implements OnInit {

    public optionsModel : OptionsModel;

    @Output() emitOptions = new EventEmitter<OptionsModel>();
    @Input('opntionsData') optionsData : any;
    @ViewChild('optionsDataForm') optionsDataForm : ElementRef;

    constructor(
      public storage: StorageService
    ) {

      this.optionsModel = new OptionsModel();
    }

    ngOnInit(): void {

    }

    /** EVENT EMITER
     * @observations Emito la data de configuraciones al padre <OptionsModel>
     */
    sendOptions():void{
        this.emitOptions.emit( this.optionsModel);
    }

}
