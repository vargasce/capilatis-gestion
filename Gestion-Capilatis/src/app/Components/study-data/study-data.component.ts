import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { StudyModel } from '../../Core/models/dbstudy/study.model';

@Component({
  selector: 'app-study-data',
  templateUrl: './study-data.component.html',
  styleUrls: ['./study-data.component.scss']
})
export class StudyDataComponent implements OnInit {


    public studyModel : StudyModel;
    public vUser : UsuarioModel;

    @Output() sendStudy = new EventEmitter<any>();
    @Input('title') title : string;

    @ViewChild('detallesForm') detallesForm : ElementRef;
    @ViewChild('diasForm') diasForm : ElementRef;
    @ViewChild('fechaForm') fechaForm : ElementRef;

    constructor(
        public dateservice : DateService,
        public renderer : Renderer2
    ) {
        this.studyModel = new StudyModel(0,false,'',this.vUser.getUsuario(),'', new Date(), new Date(), new Date() );
     }

    ngOnInit(): void {
    }

    /**  EVENT EMMITTER
     * @observations Emito la data del study-data al padre,
     *  la logica de las acciones es manipulada por quien llama al componente
     */
    eventStudy(){
        if ( this.validations() ){
            this.sendStudy.emit( this.studyModel )
        }
    }


    /** VALIDATIONS
     * @observations Validaciones de inputs necesarias para el envio de la informacion al padre y posteriormente a la API
     * en caso de no cumplir con la condicion se les agrega un 'border-error'
     */
    validations(){
        let continuo = true;

        if ( this.studyModel.detalles == ''){
            this.renderer.addClass( this.detallesForm.nativeElement,'');
            continuo = false;
        }
        
        if ( this.studyModel.dias.toString() == ''){
            this.renderer.addClass( this.diasForm.nativeElement,'');
            continuo = false;
        }

        if ( this.studyModel.fecha.toString() == ''){
            this.renderer.addClass( this.fechaForm.nativeElement,'');
            continuo = false;
        }


        return continuo;
    }

}
