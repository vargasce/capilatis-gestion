import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { LicensesModel } from '../../Core/models/dblicenses/licenses.model'

@Component({
  selector: 'app-licenses-data',
  templateUrl: './licenses-data.component.html',
  styleUrls: ['./licenses-data.component.scss']
})
export class LicensesDataComponent implements OnInit {

    public licensesModel : LicensesModel;
    public vUser : UsuarioModel;

    @Output() sendLicense = new EventEmitter<LicensesModel>();
    @Input('title') title : string;

    @ViewChild('fechaForm') fechaForm : ElementRef;
    @ViewChild('motivoForm') motivoForm : ElementRef;
    @ViewChild('diasForm') diasForm : ElementRef;

    constructor(
        public dateservice : DateService,
        public renderer : Renderer2,
    ) { 
        this.licensesModel = new LicensesModel(0,'',false, this.vUser.getUsuario(),'',new Date(), new Date(), new Date())
    }

    ngOnInit(): void {
    }


    /**  EVENT EMMITTER
     * @observations Emito la data del licenses-data al padre,
     *  la logica de las acciones es manipulada por quien llama al componente
     */
    eventLicense(){
        if ( this.validations() ){
            this.sendLicense.emit( this.licensesModel )
        }
    }

    /** VALIDATIONS
     * @observations Validaciones de inputs necesarias para el envio de la informacion al padre y posteriormente a la API
     * en caso de no cumplir con la condicion se les agrega un 'border-error'
     */
    validations(){

        let continuo = true;

        if ( this.licensesModel.dias.toString() == ''){
            this.renderer.addClass( this.diasForm.nativeElement,'');
            continuo = false;
        }

        if ( this.licensesModel.motivo == ''){
            this.renderer.addClass( this.motivoForm.nativeElement,'');
            continuo = false;
        }

        if ( this.licensesModel.fecha.toString() == ''){
            this.renderer.addClass( this.fechaForm.nativeElement,'');
            continuo = false
        }

        return continuo;

    }
    
}
