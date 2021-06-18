import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../Core/services/storage/storage.service';
import { UsuarioModel } from '../../Core/models/usuario/usuario.model';
import { AdministratorService } from '../../Core/services/administrator/administrator.service';
import { AdministratorModel } from 'src/app/Core/models/administrator/administrator.model';
import { PermitsAdministratorModel } from 'src/app/Core/models/permits/permitsadministrator.model';
import { PermitsEmployeeModel } from 'src/app/Core/models/permits/permitsemployee.model';
import { PermitsHolidaysModel } from 'src/app/Core/models/permits/permitsholidays.model';
import { PermitsModuleModel } from 'src/app/Core/models/permits/permitsmodule.model';
import { PermitsNewsModel } from 'src/app/Core/models/permits/permitsnews.model';
import { PermitsReportsModel } from 'src/app/Core/models/permits/permitsreports.model';
import { PermitsVariousModel } from 'src/app/Core/models/permits/permitsvarious.model';
import { Router } from '@angular/router';


@Component({
 selector: 'app-new-administrator',
 templateUrl: './new-administrator.component.html',
 styleUrls: ['./new-administrator.component.scss'],
 providers: [ AdministratorService ]
})
export class NewAdministratorComponent implements OnInit {

    public administratorModel : AdministratorModel;
    public permitsAdministrator : PermitsAdministratorModel;
    public permitsEmployee : PermitsEmployeeModel;
    public permitsHolidays : PermitsHolidaysModel;
    public permitsModule : PermitsModuleModel;
    public permitsNews : PermitsNewsModel;
    public permitsReport : PermitsReportsModel;
    public permitsVarious : PermitsVariousModel;
    public vUser : UsuarioModel;
    public dataModal : any = {};
    public permits : any
	public id_administrator : string = '';

    constructor(
        public _administratorservice : AdministratorService,
        public storage : StorageService,
		private navigation : Router,
    ) { 
          this.vUser = new UsuarioModel();
					this.administratorModel = new AdministratorModel('','','','','','','','',0,'',false,'','','','',true,0);
    }

    ngOnInit(): void {

    }
  

    newAdministrator( data : AdministratorModel):void{

        
        if( this.storage.getCurrentSession() != null ){

            this._administratorservice.setAdministrator( 0 ,data , 'setadministrator', 'NEW', this.storage.getCurrentToken() ).subscribe(
                response=>{
                    if( response.error == '' ){
                        this.eventModal('Carga de Administrador Exitosa', false);
                        this.storage.updateToken( response.token );

                    }else{
						this.eventModal(response.error, false);
                    }
                },
                error=>{
					if( error.error.sessionFail == 'true' ){
						this.eventModal('Session caducada.', true);
					}else{
						this.eventModal(`Si ve este cartel por favor comunicarse con soporte de sistemas.`, false);
					}
	            }
            );
        }else{
			this.navigation.navigate(['/']);
        }

    }

    /**
     * 
     * @param permisos  objeto contenedor de los permits a subir   {  'nombre del modulo' : ModelPermitsCorrespondiente}
     */
    setPermits( permisos : any){

        if( this.storage.getCurrentSession() != ''){

            this._administratorservice.setPermits( permisos, 'path correspondiente').subscribe( 
                response =>{
                    if( !(response.error == '') ){
                        this.eventModal( response.error , false);
                    }
            },
            error =>{
                if( error.error.sessionFail == 'true' ){
                    this.eventModal('Session caducada.', true);
                }else{
                    this.eventModal(`Si ve este cartel por favor comunicarse con soporte de sistemas.`, false);
                }
            }
            );
        }else{
            this.navigation.navigate(['/home']);
        }
    }
        

    /** EVENTO COMPONENTE HIJO
     *  @Observations : Evento click del component hijo, contiene AdministratorData, Emit
     */
    eventAdministratorChild( administratormodelchild : AdministratorModel):void {
        this.administratorModel = administratormodelchild;
        this.newAdministrator( this.administratorModel);
    }

    /**
     * 
     * @param permits 
     */
    eventPermits( permits : any):void {
        this.permits = permits;
    }

        
    /** EVENTO COMPONENTE MODAL
     * @observvations : evento disparador del modal-custom
     * @param message Mensaje a mostrar;
     * @param Input : false / true muestra el form de inicio de session o lo oculta
     */
    eventModal( message : string, input : boolean){
        this.dataModal = { 'message' : message, 'IsShowModal' : true, 'IsShowInput' : input };
    }

    
}
