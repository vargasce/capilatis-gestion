import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { HsextraModel } from '../../Core/models/dbhsextra/hsextra.model';

@Component({
  selector: 'app-extra-hours-data',
  templateUrl: './extra-hours-data.component.html',
  styleUrls: ['./extra-hours-data.component.scss']
})
export class ExtraHoursDataComponent implements OnInit {

    public hsextraModel : HsextraModel;
    public vUser : UsuarioModel;

    @Output() sendExtraHour = new EventEmitter<HsextraModel>();
    @Input('title') title : string;

    @ViewChild('periodoForm') periodoForm : ElementRef;
    @ViewChild('hsextraForm') hsextraForm : ElementRef;

    constructor(
        public dateservice : DateService,
        public renderer : Renderer2,
    ) {   
        this.hsextraModel = new HsextraModel( new Date(), 0 , this.vUser.getUsuario(), new Date(),'',new Date() );
    }

    ngOnInit(): void {
    }

    /**  EVENT EMMITTER
     * @observations Emito la data del extra-hour-data al padre,
     *  la logica de las acciones es manipulada por quien llama al componente
     */
    eventHour(){
        if ( this.validations() ){
        this.sendExtraHour.emit( this.hsextraModel );
        }
    }


    /** VALIDATIONS
     * @observations Validaciones de inputs necesarias para el envio de la informacion al padre y posteriormente a la API
     * en caso de no cumplir con la condicion se les agrega un 'border-error'
     */
    validations(){
        let continuo = true;

        if ( this.hsextraModel.hsextra.toString() == ''){
            this.renderer.addClass( this.hsextraForm.nativeElement,'');
            continuo = false;
        }

        if ( this.hsextraModel.periodo.toString() == ''){
            this.renderer.addClass( this.periodoForm.nativeElement,'');
            continuo = false;
        }

        return continuo;
    }

}
