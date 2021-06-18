import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../Core/services/storage/storage.service';
import { HelpService } from '../../Core/services/help/help.service';


@Component({
  selector: 'app-list-administrator',
  templateUrl: './list-administrator.component.html',
  styleUrls: ['./list-administrator.component.scss'],
  providers : [ HelpService ]
})
export class ListAdministratorComponent implements OnInit {

    public headersList = ['Usuario' ,'Nombre' ,  'Apellido' , 'Fecha Activo' , 'Hora Activo', 'Correo', 'Action']; 
		public administratorList : any;
    public tabla : any = {};
    public optionsTable = {};
    public dataModal : any = {}


  constructor(
      public _helpservice : HelpService,
      public storage : StorageService,
		private navigation : Router
  ) {
		this.loadgrid();
  }

  ngOnInit(): void {
  }

	eventEditField( id_administrador : any ){
 	 this.navigation.navigate(['home/editadministrator/'+id_administrador]);
	}

	loadgrid(){
		if( this.storage.getCurrentSession != null ){
			this._helpservice.fieldHelp( {action : 'activos' } , 'help').subscribe(
				response =>{
						if(response.error == ''){
								this.administratorList = response.Resultset;  

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

	/** EVENTO COMPONENTE MODAL
	 * @observvations : evento disparador del modal-custom
	 * @param message Mensaje a mostrar;
	 * @param Input : false / true muestra el form de inicio de session o lo oculta
	 */
		eventModal( message : string, input : boolean){
			this.dataModal = { 'message' : message, 'IsShowModal' : true, 'IsShowInput' : input };
		}

}
