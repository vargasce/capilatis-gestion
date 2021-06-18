import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { PresenteeismModel } from '../../Core/models/dbpresenteeism/presenteeism.model';

@Component({
  selector: 'app-presenteeism-data',
  templateUrl: './presenteeism-data.component.html',
  styleUrls: ['./presenteeism-data.component.scss']
})
export class PresenteeismDataComponent implements OnInit {

    public presenteeismModel : PresenteeismModel;
    public vUser : UsuarioModel;

    @Output() emitPresenteeism = new EventEmitter<PresenteeismModel>();
    @Input('title') title : string;
    @ViewChild('periodoForm') periodoForm : ElementRef;
    @ViewChild('id_legajoForm') id_legajoForm : ElementRef;


    constructor(
        public renderer : Renderer2,
        public dateService : DateService, 
    )   {
        this.presenteeismModel = new PresenteeismModel( true,'', this.vUser.getUsuario(), new Date(), new Date(), new Date() )
    }

    ngOnInit(): void {
    }


    /**  EVENT EMMITTER
     * @observations Emito la data del presenteeism-data al padre,
     *  la logica de las acciones es manipulada por quien llama al componente
     */
    sendPresenteeism():void{
        if( this.validations() ){
            this.emitPresenteeism.emit( this.presenteeismModel );
        }
    }



    /** VALIDATIONS
     * @observations Validaciones de inputs necesarias para el envio de la informacion al padre y posteriormente a la API
     * en caso de no cumplir con la condicion se les agrega un 'border-error'
     */
    validations(){
        let continuo = true;
        if( this.presenteeismModel.periodo.toString() == ''){
            this.renderer.addClass( this.periodoForm.nativeElement,'border-error');
            continuo = false
        }
        if( this.presenteeismModel.id_legajo == ''){
            this.renderer.addClass( this.id_legajoForm.nativeElement,'border-error');
            continuo = false;
        }
        return continuo
    }



    eventError(){
      
    }

}
