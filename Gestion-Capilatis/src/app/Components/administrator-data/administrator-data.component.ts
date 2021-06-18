import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { StorageService } from '../../Core/services/storage/storage.service';
import { AdministratorModel } from '../../Core/models/administrator/administrator.model';
import { PermitsAdministratorModel } from '../../Core/models/permits/permitsadministrator.model';
import { PermitsEmployeeModel } from '../../Core/models/permits/permitsemployee.model';
import { PermitsHolidaysModel } from '../../Core/models/permits/permitsholidays.model';
import { PermitsModuleModel } from '../../Core/models/permits/permitsmodule.model';
import { PermitsNewsModel } from '../../Core/models/permits/permitsnews.model';
import { PermitsReportsModel } from '../../Core/models/permits/permitsreports.model';
import { PermitsVariousModel } from '../../Core/models/permits/permitsvarious.model';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';




@Component({
    selector: 'app-administrator-data',
    templateUrl: './administrator-data.component.html',
    styleUrls: ['./administrator-data.component.scss'],
    providers: [  ]
    })
    export class AdministratorDataComponent implements OnInit {

    public administratorModel : AdministratorModel;
    public permitsAdministrator : PermitsAdministratorModel;
    public permitsEmployee : PermitsEmployeeModel;
    public permitsHolidays : PermitsHolidaysModel;
    public permitsModule : PermitsModuleModel;
    public permitsNews : PermitsNewsModel;
    public permitsReport : PermitsReportsModel;
    public permitsVarious : PermitsVariousModel;
    public vUser : UsuarioModel;
	  public cpass : string;
    

    @Output() emitAdministrator = new EventEmitter<AdministratorModel>();
    @Output() emitPermits = new EventEmitter<any>();
    @Input('administratorData') administratorData : any;
    @Input('permitsData') permitsData : any;
    @Input('title') titulo: string;
    @ViewChild('administratorDataForm') administratorDataForm : ElementRef;

    // VIEW CHILD CORRESPONDIENTE A ADMINISTRATOR MODEL
    @ViewChild('usuarioForm') usuarioForm :ElementRef;
    @ViewChild('nombreForm') nombreForm :ElementRef;
    @ViewChild('passForm') passForm :ElementRef;
    @ViewChild('cpassForm') cpassForm : any; 
		@ViewChild('correoForm') correoForm : ElementRef;
    @ViewChild('respuestaForm') respuestaForm : ElementRef;
    @ViewChild('apellidoForm') apellidoForm : ElementRef;

    // VIEW CHILD ACCESOS TOTALES
    @ViewChild('totalAccesEmployee') totalAccesEmployee: ElementRef;
    @ViewChild('totalAccesAdministrator') totalAccesAdministrator:  ElementRef;
    @ViewChild('totalAccesHolidays') totalAccesHolidays: ElementRef;
    @ViewChild('totalAccesNews') totalAccesNews: ElementRef;
    @ViewChild('totalAccesReports') totalAccesReports: ElementRef;
    @ViewChild('totalAccesVarious') totalAccesVarious: ElementRef;

    @ViewChild('totalAccesModule') totalAccesModule :ElementRef;




      
    constructor(
        public renderer: Renderer2,
        public storage: StorageService
    ) {  

        this.administratorModel = new AdministratorModel('','','','','','','','',5,'',false,'','','','',true,0);
        this.permitsModule = new PermitsModuleModel(true,true,true,true,true,true);
        this.permitsAdministrator = new PermitsAdministratorModel(true,true,true,true,true);
        this.permitsEmployee = new PermitsEmployeeModel(true,true,true);
        this.permitsHolidays = new PermitsHolidaysModel(true,true,true);
        this.permitsNews = new PermitsNewsModel(true,true,true,true,true,true,true,true);
        this.permitsReport = new PermitsReportsModel(true,true,true);
        this.permitsVarious = new PermitsVariousModel(true,true,true);
        
    }


    ngOnInit(): void {
        setTimeout(()=>{
			this.eventError();
		},300);
    }

    ngOnChanges(): void {
 		    this.administratorModel = ( this.administratorData ) ? this.administratorData : new AdministratorModel('','','','','','','','',5,'',false,'','','','',true,0);
        // this.permitsModule = ( this.permitsData.module ) ? this.permitsData.module : new PermitsModuleModel(true,true,true,true,true,true);
        // this.permitsAdministrator = ( this.permitsData.administrator ) ? this.permitsData.administrator : new PermitsAdministratorModel(true,true,true);
        // this.permitsEmployee = ( this.permitsData.employee ) ? this.permitsData.employee : new PermitsEmployeeModel(true,true,true);
        // this.permitsHolidays = ( this.permitsData.holidays ) ? this.permitsData.holidays : new PermitsHolidaysModel(true,true,true);
        // this.permitsNews = ( this.permitsData.news ) ? this.permitsData.news : new PermitsNewsModel(true,true,true,true,true,true,true,true);
        // this.permitsReport = ( this.permitsData.report ) ? this.permitsData.report : new PermitsReportsModel(true,true,true);
        // this.permitsVarious = ( this.permitsData.various ) ? this.permitsData.various : new PermitsVariousModel(true,true,true);
        
    }


    /** EVENT EMITER
     * @observations Emito la data del administrator al padre, la logica de las acciones 
     * es manipulada por quien llama al componente Administrator Data
     */
    sendAdministrator ():void{
			if (this.validations() ){
				this.administratorModel.id_extreme = '';
				this.emitAdministrator.emit( this.administratorModel );
				this.emitPermits.emit( this.buildPermits() );
			}
    }

    /** BUILD PERMITS
     * 
     * @returns objeto contenedor de los permisos del administrador
     */
    buildPermits(){
			let send = {
				'module' : this.permitsModule,
				'administrator' : this.permitsAdministrator,
        'employee' : this.permitsEmployee,
				'holidays' : this.permitsHolidays,
				'news' : this.permitsNews,
				'report' : this.permitsReport,
				'various' : this.permitsVarious, 
			}

			return send;
    }


    /** VALIDACION DE INPUTS
     * @observations Validaciones necesarias para los inputs de Administrator Data
     *  agrega la clase 'border-error' al input en caso de no cumplir con las condiciones
     * 
     */
    validations():boolean{
			let continuo = true;

			// ADMINISTRATOR MODEL
			
			if ( this.administratorModel.nombre == '' ){
					this.renderer.addClass(this.nombreForm.nativeElement,'border-error');
					continuo = false;
			}

			if ( this.administratorModel.apellido == '' ){
					this.renderer.addClass(this.apellidoForm.nativeElement,'border-error');
					continuo = false;
			}

			if ( this.administratorModel.pass == '' ){
					this.renderer.addClass(this.passForm.nativeElement,'border-error');
					continuo = false;
			}

			if ( this.cpassForm.nativeElement.value == '' ){
					this.renderer.addClass(this.cpassForm.nativeElement,'border-error');
					continuo = false;
			}

			if ( this.administratorModel.pass != this.cpass){
					this.renderer.addClass(this.passForm.nativeElement,'border-error');
					this.renderer.addClass(this.cpassForm.nativeElement,'border-error');
					continuo = false;
			}

			if ( this.administratorModel.usuario == '' ){
					this.renderer.addClass(this.usuarioForm.nativeElement,'border-error');
					continuo = false;
			}

			if ( this.administratorModel.correo == '' || !/^[a-zA-Z0-9._-]+@[a-zA-Z]+.([a-zA-Z]{2,4})+$/.test(this.administratorModel.correo) ){
					this.renderer.addClass(this.correoForm.nativeElement,'border-error');
					continuo = false;
			}

			if ( this.administratorModel.respuesta == ''){
					this.renderer.addClass(this.respuestaForm.nativeElement,'border-error')
					continuo = false;
			}


			return continuo;
    }

    
    /** EVENTO ON CHANGE
     *  @Observations :  detecta cambios en los inputs de Administrator-Data y remueve la clase 
     *  'border-error' en caso de que esten correctos
     */
    eventError(){
        // ADMINISTRATOR MODEL
			this.renderer.listen( this.nombreForm.nativeElement, 'change', (event : any) => {
				this.renderer.removeClass( this.nombreForm.nativeElement,'border-error' );
			});
      this.renderer.listen( this.apellidoForm.nativeElement, 'change', (event : any) => {
				this.renderer.removeClass( this.apellidoForm.nativeElement,'border-error' );
			});
			this.renderer.listen( this.passForm.nativeElement, 'change', (event : any) => {
				this.renderer.removeClass( this.passForm.nativeElement,'border-error' );
        this.renderer.removeClass( this.cpassForm.nativeElement,'border-error' );
			});
      this.renderer.listen( this.cpassForm.nativeElement, 'change', (event : any) => {
				this.renderer.removeClass( this.cpassForm.nativeElement,'border-error' );
        this.renderer.removeClass( this.passForm.nativeElement,'border-error');
			});
			this.renderer.listen( this.usuarioForm.nativeElement, 'change', (event : any) => {
				this.renderer.removeClass( this.usuarioForm.nativeElement,'border-error' );
			});
      this.renderer.listen( this.correoForm.nativeElement, 'change', (event : any) => {
				this.renderer.removeClass( this.correoForm.nativeElement,'border-error' );
			});
      this.renderer.listen( this.respuestaForm.nativeElement, 'change', (event : any) => {
				this.renderer.removeClass( this.respuestaForm.nativeElement,'border-error' );
			});
    }



}
