import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../Core/services/empleados/emp.service';
import { StorageService } from '../../Core/services/storage/storage.service';
import { UsuarioModel } from '../../Core/models/usuario/usuario.model';
import { NominaModel } from '../../Core/models/dbnomina/nomina.model';
import { FileService } from '../../Core/services/update-files/updateFiles.service'
import { DateService } from '../../Core/services/dates/date.service'
import { HelpService } from '../../Core/services/help/help.service'
import { Router } from '@angular/router';
//Model

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
   providers : [ HelpService ]
})
export class NewEmployeeComponent implements OnInit {

    public vUser : UsuarioModel;
    public modelNomina : NominaModel;
    public fileToUpload : File;
    public dataModal : any = {};
    public ultimoLegajo : string;


  constructor(
        private _empservice : EmpService,
        public storage : StorageService,
        public _fileservice : FileService,
        public _dateservice : DateService,
        public _helpservice : HelpService,
        public navigation : Router
  ) {
          this.vUser = new UsuarioModel();
          this.modelNomina = new NominaModel();

   }

    ngOnInit(): void {
    }

    newEmployee():void{

        if( this.storage.getCurrentSession != null ){
          
						let img = this.modelNomina.foto;
            this.modelNomina.foto = '';
            this.modelNomina.fecha_update = this._dateservice.serializableActualDateFormat();
            this.modelNomina.fecha_carga = this._dateservice.serializableActualDateFormat();
            
            this._empservice.setEmployee( this.modelNomina ,'setemployee','NEW' , this.storage.getCurrentToken() ).subscribe(
                response =>{
                    if(response.error == ''){
                        this.eventModal('Carga de empleado Exitosa', false);
												this.modelNomina.foto = img;
                        this.saveFile( this.modelNomina );
                        this.storage.updateToken( response.token);
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
                this.navigation.navigate(['/home']);
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



  /** EVENTO COMPONENTE HIJO
	* @Observations : evento click de hijo component, contenedor de data employee. Emit.
	*/ 
	eventEmployeeChild(modelnominachild: NominaModel ):void {
		this.modelNomina = modelnominachild;
		this.newEmployee();
  }
  

	/** CARGA ARCHIVOS EMPLOYEE.  
	* @Observations : Realiza la carga de las distintos archivos del empleado, si es que existe.
	*/ 
	saveFile( nomina : NominaModel ):void {


        if( nomina.foto ){
          let send = {
            'img' : nomina.foto,
            'token': this.vUser.getToken()
          };

          this._fileservice.makeFileRequest('uploadImg/'+nomina.id_legajo, send ,'image').then( ( result ) =>{});
          
        }


        if( nomina.cert_cuil ){
          let send = {
            'file' : nomina.cert_cuil
          };
          
          this._fileservice.makeFileRequest(`uploadFile/${nomina.id_legajo}`, send, 'files').then( ( result ) =>{});
        
        }


        if( nomina.foto_dni ){
          let send = {
            'file' : nomina.foto_dni
          };

          this._fileservice.makeFileRequest( `uploadFile/${nomina.id_legajo}`, send, 'files' ).then( result =>{  });
        }
        
        if( nomina.foto_dnidso ){
          let send = {
            'file' : nomina.foto_dnidso
          };

          this._fileservice.makeFileRequest( `uploadFile/${nomina.id_legajo}`, send, 'files' ).then( result =>{  });
        }


        if( nomina.alta_afip ){
          let send = {
            'file' : nomina.alta_afip
          };

          this._fileservice.makeFileRequest( `uploadFile/${nomina.id_legajo}/${this.vUser.getToken()}`, send, 'files' ).then( result =>{  });
        }
        

        
  }

}
