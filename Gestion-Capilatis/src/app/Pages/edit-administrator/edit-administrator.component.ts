import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../Core/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
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


@Component({
  selector: 'app-edit-administrator',
  templateUrl: './edit-administrator.component.html',
  styleUrls: ['./edit-administrator.component.scss'],
  providers: [ AdministratorService, StorageService ]
})
export class EditAdministratorComponent implements OnInit {

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
  private id: number;

  @Input('title') titulo: string;  

  constructor(
      private _administratorservice : AdministratorService,
      private activateRoute : ActivatedRoute,
      public storage : StorageService,
      public navigation : Router

  ) { 
        this.vUser = new UsuarioModel();
        this.administratorModel = new AdministratorModel('','','','','','','','',0,'',true,'','','','',true,0);
        this.id = this.activateRoute.snapshot.params.id_administrador;
        this.editarAdministrador(this.id);

  }

  ngOnInit(): void {
  }


    editarAdministrador ( id : any ): void{
        if( this.storage.getCurrentSession() != null ){

            this.vUser.setCurrentSession( this.storage.getCurrentSession() );
            this._administratorservice.editAdministrador({ 'id' : id , 'token' : this.vUser.getToken() }, 'getAdministrator').subscribe(
                response =>{
                    if(response.error == ''){
                        this.administratorModel = response.Resulset[0];
                        this.storage.updateToken( response.token );

                    }else{
                        console.log('Menssage user : '+ response.error);
                    }
                },
                error => {
                    console.error();
                }
            );
        }else{
            console.log('Tenemos un problema, llego hasta aca sin sesion');
        }

    }


    saveRecordAdministrator( data : AdministratorModel ):void{
        if( this.storage.getCurrentSession != null ){
            this.vUser.setCurrentSession( this.storage.getCurrentSession() );
            this._administratorservice.setAdministrator( this.id, data , 'setadministrator', 'UPDATE', this.vUser.getToken() ).subscribe(
                response=>{
                    if(response.error==''){
                        this.eventModal('Update de Administrador Exitoso',false );
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


    /** EVENTO COMPONENTE HIJO
     *  @observations evento click del component hijo, contiene AdministratorData, Emit
     */
    eventAdministratorChild( administratormodelchild : AdministratorModel):void {
        this.administratorModel = administratormodelchild;
        this.saveRecordAdministrator( this.administratorModel );
    }

    
    /** EVENTO COMPONENTE MODAL
     * @observvations : evento disparador del modal-custom
     * @param message Mensaje a mostrar;
     * @param Input : false / true muestra el form de inicio de session o lo oculta
     */
     eventModal( message : string, input : boolean){
        this.dataModal = { 'message' : message, 'IsShowModal' : true, 'IsShowInput' : input };
    }

		eventPermits( data : any ){
			console.log(data);//EVENTO NO DEFINIDO POR EL MOMENTO.
		}

}
