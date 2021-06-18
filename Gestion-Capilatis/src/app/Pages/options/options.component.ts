import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { OptionsModel } from '../../Core/models/options/options.model';
import { StorageService } from 'src/app/Core/services/storage/storage.service';
import { OptionsService } from '../../Core/services/options/options.service';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
    providers: [ OptionsService ]
})
export class OptionsComponent implements OnInit {

  public optionsModel : OptionsModel;
  public vUser : UsuarioModel;
  public dataModal : any = {}


  constructor(

      private storage : StorageService,
      private _optionsservice : OptionsService,

  ) { 

      this.vUser = new UsuarioModel();
      this.optionsModel = new OptionsModel();

  }



  ngOnInit(): void {
  }
    getOptions():void{
        if( this.storage.getCurrentSession != null){
            
            this._optionsservice.getOptions( this.vUser.getID(), 'path consulta').subscribe(
                response=>{
                    if(response.error == ''){
                        this.optionsModel = response.Resulset[0];
                        this.storage.updateToken( response.token );
                    }else{
                        console.log('Message User');
                    }
                },
                error=>{
                    console.log('Error al realizar la peticion');
                }
            );
        }else{
            console.error('NO posee session');
        }
    }


    /** GUARDAR OPTIONCES
     * @observations : Guardamos las preferencias del usuario
     */
    saveOptions():void{
        if( this.storage.getCurrentSession != null ){
            this.vUser.setCurrentSession( this.storage.getCurrentSession() );
            this._optionsservice.setOptions( this.vUser.getID(), this.optionsModel ,'PATH CONSULTA', this.vUser.getToken()).subscribe(
                response=>{
                    if(response.error==''){
                        this.eventModal('Opciones Guardadas');
                        this.storage.updateToken( response.token);                   
                    }else{
                        console.log('Message User');
                    }
                },
                error=>{
                  console.error('Error al realizar la peticion');
                }
            );
        }else{
            console.error('No posee session');
        }
    }


    /** EVENTO COMPONENTE HIJO
    *  @observations : Evento click del componente hijo, contenedor de OptionsData, Emit
    */
    eventOptionsChild(optionsmodelChild : OptionsModel):void{
        this.optionsModel = optionsmodelChild;
        this.saveOptions();
    }


    /** EVENTO COMPONENTE MODAL
    * @observations : evento disparador del modal-custom
    * @param message Mensaje a mostrar
    */
    eventModal( message : string){
      this.dataModal = { 'message' : message, 'IsShowModal' : true };
    }

}
