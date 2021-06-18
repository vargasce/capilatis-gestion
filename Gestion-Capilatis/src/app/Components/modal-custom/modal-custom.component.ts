import { Component, OnInit, Input,SimpleChanges, ViewChild, EventEmitter, Renderer2, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/Core/models/login/login.model';
import { UsuarioModel } from 'src/app/Core/models/usuario/usuario.model';
import { LoginService } from 'src/app/Core/services/login/login.service';
import { StorageService } from 'src/app/Core/services/storage/storage.service';

@Component({
  selector: 'app-modal-custom',
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.scss'],
  providers : [ LoginService, StorageService ]
})
export class ModalCustomComponent implements OnInit {

    public modelLogin : LoginModel;
    public errorLogin : boolean = false;
    public messageError : String = '';
    public vUser : UsuarioModel;



    public ShowModal : boolean;
    public ShowInput : boolean;
    public text : string;

    @Input('dataModal') dataModal : any;
    @ViewChild('userForm') userForm : ElementRef;
    @ViewChild('passForm') passForm : ElementRef;



    constructor(
        private _loginService : LoginService,
        private storage : StorageService,
        private navegacion : Router,
        private renderer : Renderer2,
    ) { 
        this.modelLogin = new LoginModel('','');
        this.vUser = new UsuarioModel();
    }

    ngOnInit(): void {
        setTimeout(()=>{
        //   this.errorLoginValue();
        },300);
    }


    ngOnChanges ( changes : SimpleChanges ):void{
        if (!changes.dataModal.firstChange ) {
            this.text = this.dataModal.message;
            this.ShowModal = this.dataModal.IsShowModal;
            this.ShowInput = this.dataModal.IsShowInput;
        }
    }
  

    toggleModal(){
        if ( this.ShowInput == true ){
            this.ShowModal = true
        }else{
            this.ShowModal = !this.ShowModal;
        }
    }

    loginPrueba ( form : any ){


        console.log( this.storage.getCurrentToken() );

        this._loginService.setLogin( this.modelLogin, 'login' ).subscribe(
            response => {
                if ( response.error ==''){

                    this.vUser.setCurrentSession(response.Resulset);
                    this.storage.setCurrentSession( this.vUser.getSession() );
                    this.storage.updateToken( this.vUser.getToken() );

                    
                    console.log(console.log( 'despues',this.vUser.getToken() ) == console.log( 'despues storage' , this.storage.getCurrentToken() ))


                    this.ShowModal = false;
                    this.ShowInput = false;
                    this.text = "keep it working";
                }else{
                  this.errorLogin = true;
                  this.messageError = "usuario y/o contraseña invalido";
                }
            },
            error => {
                this.errorLogin = true;
                this.messageError = "usuario y/o contraseña invalido";
            }
        );

        form.reset();
    }

    /** ERROR LOGIN
     * @observations oculta el text errorLogin en caso de que el administrador y usuario sean correctos
     */
    // errorLoginValue(){
    //     this.renderer.listen( this.userForm.nativeElement,'change',(event : any) => {
    //         this.errorLogin = false;
    //     });
    //     this.renderer.listen( this.passForm.nativeElement,'change',(event: any) =>{
    //         this.errorLogin = false;
    //     })
    // }

    /** EXIT EVENT
     * @observations el usuario es redirigido a '/' al no iniciar session
     */
    exitEvent(){
        this.navegacion.navigate(['/']);
    }




}
