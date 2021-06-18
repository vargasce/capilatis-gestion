import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { AdministratorService } from 'src/app/Core/services/administrator/administrator.service';
import { StorageService } from '../../Core/services/storage/storage.service';
import { trigger, state, style, animate, transition, query, group , animateChild} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
        trigger('disparo', [ state('true', style({
            transform: 'translateY(0) scaleY(1)',        
            width: '100%',
            height: '100vh',
            position: 'relative',
            zIndex: '1000'
        })),
        state('false', style({
            transform:  'translateY(-50%) scaleY(0.0000000000001)', 
            position: 'absolute',       
        })),
        transition('true <=> false', animate('0.3s ease-out'))]),
        trigger('user-options', [ state('true', style({
            transform: 'translateY(0) scaleY(1)',        
            width: '10rem', 
            backgroundColor: '#0066AD',           
            position: 'absolute',
            right: '0',
            top: '2rem',
            zIndex: '1000',
            borderRadius: '0 0 0 4px'
        })),
        state('false', style({
            transform:  'translateY(-50%) scaleY(0)', 
            position: 'absolute', 
            right: '0',
            top: '2rem',      
        })),
        transition('true <=> false', animate('0.3s ease-out'))]),
    ],
    providers: [ AdministratorService ]
    
})

export class HomeComponent implements OnInit {
        public estadoMenu : boolean = false;
        public estadoUser : boolean = false;        
        private vUser : UsuarioModel;

        menuOpen(): void{
            this.estadoMenu = !this.estadoMenu;  
        }
        menuUser(): void{
            this.estadoUser = !this.estadoUser;  
        }

  constructor(

      private navegacion : Router,
      private storage : StorageService,
      private _administratorservice : AdministratorService,

  ){ 
      this.vUser = new UsuarioModel();
   }

  ngOnInit(): void {
  }

    /** COSE SESSION EVENT
   * @Observations Si hay actualmente una session iniciada, cerramos la session en la API y
   *  remuevo las datos del usuario del localstorage y redirijo al usuario a la pantalla de login
   */
    logoutEvent():void{
    if( this.storage.getCurrentSession != null ){

        this.vUser.setCurrentSession( this.storage.getCurrentSession() );
        this._administratorservice.logoutAdministrator(this.vUser.getID(),'close').subscribe(
            response =>{
                if(response == ''){
                    this.storage.removeCurrentSession();
                    this.navegacion.navigate(['']);
                }else{
                    console.log('Menssage User');
                }
            },
            error =>{
                console.error('Error al realizar la peticion.');
            }
        );
    }else{
        console.error('Error no posee session.');
    }


}

}
