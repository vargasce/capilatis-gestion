import { Component, OnInit, EventEmitter, Output, Input, Renderer2, ViewChild, ElementRef,} from '@angular/core';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { DateService } from 'src/app/Core/services/dates/date.service';
import { StorageService } from 'src/app/Core/services/storage/storage.service';
import { AwardsModel } from '../../Core/models/dbawards/awards.model'


@Component({
  selector: 'app-award-data',
  templateUrl: './award-data.component.html',
  styleUrls: ['./award-data.component.scss']
})
export class AwardDataComponent implements OnInit {

    public awardModel : AwardsModel;
    public vUser : UsuarioModel;


    @Output() emitAward = new EventEmitter<any>();
    @Input('title') titulo : string;
    @ViewChild('id_legajoForm') id_legajoForm : ElementRef;
    @ViewChild('periodoForm') periodoForm : ElementRef; 
    @ViewChild('premioForm') premioForm : ElementRef;




    constructor(
        public storage : StorageService,
        public dateservice : DateService,
        public renderer : Renderer2,
    ) { 
        this.awardModel = new AwardsModel('',0, new Date(), this.vUser.getUsuario(),'', new Date())
    }

    ngOnInit(): void {
    }

    /** SEND AWARD
     * @observations EventEmitter<AwardModel> envio la data del premio al padre, la logica de las acciones es manejada por este mismo
     */
    sendAward ():void{
      if ( this.validations() ){
          this.emitAward.emit( this.awardModel );
      }
    }




    /** VALIDATIONS
     * @observations validaciones necesarias para el envio de datos al padre y API posteriormente
     */
    validations(){
        let continuo = true;
        if ( this.awardModel.id_legajo == ''){
            this.renderer.addClass( this.id_legajoForm.nativeElement,'');
            continuo = false;
        }
        if ( this.awardModel.periodo.toString() == ''){
            this.renderer.addClass( this.periodoForm.nativeElement,'');
            continuo = false;
        }
        if( this.awardModel.premio == 0){
            this.renderer.addClass( this.premioForm.nativeElement,'')
            continuo = false;
        }

        return continuo
    }

    /** EVENTO ON CHANGE
     * @observations : detecta cambios en los inputs de award-data y remueve la clase
     * 'border-error' en caso de que esten correctos
     */
    eventError(){
        this.renderer.listen( this.id_legajoForm.nativeElement, 'change', (event : any) =>{
            this.renderer.removeClass( this.id_legajoForm.nativeElement,'')
        });
        this.renderer.listen( this.periodoForm.nativeElement, 'change', (event : any) =>{
            this.renderer.removeClass( this.periodoForm.nativeElement,'')
        });
        this.renderer.listen( this.premioForm.nativeElement, 'change', (event:any) =>{
            this.renderer.removeClass( this.premioForm.nativeElement,'')
        });

    }

}
