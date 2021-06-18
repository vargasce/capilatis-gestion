import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../Core/services/storage/storage.service';
import { HelpService } from '../../Core/services/help/help.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  providers : [ HelpService ]
})
export class AssetsComponent implements OnInit {

  public headersList = ['Usuario' ,'Nombre' ,  'Apellido' , 'Fecha Activo' , 'Hora Activo', 'Sistema Ope.', 'Plataforma', 'Activo']; 
  public assetslist : any;
  public dataModal : any = {};

  constructor(
        public _helpservice : HelpService,
        public storage : StorageService,
        private navigation : Router,
  ) {    
  }

  ngOnInit(): void {
    this.assetsUpload();
  }

	//COMENTAR LOS METODOS.
    /**
     * 
     */
    assetsUpload():void{
        if( this.storage.getCurrentSession != null ){
          
            this._helpservice.fieldHelp( {action : 'activos' } , 'help').subscribe(
                response =>{
                    if(response.error == ''){
                        this.assetslist = response.Resultset      
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
