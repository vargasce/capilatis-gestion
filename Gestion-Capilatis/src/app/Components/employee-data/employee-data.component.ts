import { Component, OnInit, EventEmitter, Output, Input, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NominaModel } from '../../Core/models/dbnomina/nomina.model';
import { HelpService } from '../../Core/services/help/help.service';
import { Global } from '../../Core/Global';
import { NgForm } from '@angular/forms';
import { EmpService } from '../../Core/services/empleados/emp.service';
import { StorageService } from '../../Core/services/storage/storage.service';
import { UsuarioModel } from '../../Core/models/usuario/usuario.model';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
	providers : [ HelpService , EmpService ]
})
export class EmployeeDataComponent implements OnInit, OnChanges {

	public nominaModel : NominaModel;
	public selectsector : any;
	public selectosocial : any;
	public selectgruop :any;
	public selectjefe : any;
	public selectpremios : any;
	public selectalmuerzo : any;
	public selectcategoria : any;
    public selecthsextra : any;
	public fileToUpload : Array<File>;
	public fileToUploadCuil : Array<File>;
	public fileToUploadDorso : Array<File>;
	public fileToUploadFrente : Array<File>;
	public fileToUploadAfip : Array<File>;
	public img_foto : string = '';
	private legajo : string;
	public vUser : UsuarioModel;

	@Output() emitNomina = new EventEmitter<NominaModel>();
	@Input('dataModel') dataModel : NominaModel;
	@ViewChild('employeeDataForm') refForm : ElementRef;
	@ViewChild('nombreForm') nombreForm : ElementRef;
	@ViewChild('legajoForm') legajoForm : ElementRef;
	@ViewChild('cuilForm') cuilForm : ElementRef;
	@ViewChild('fecha_ingresoForm') fecha_ingresoForm : ElementRef;
	@ViewChild('fecha_nacimientoForm') fecha_nacimientoForm : ElementRef;
	@ViewChild('mailForm') mailForm : ElementRef;
	@ViewChild('id_sectorForm') id_sectorForm : ElementRef;
	@ViewChild('convenioForm') convenioForm : ElementRef;
	@ViewChild('id_o_socialForm') id_o_socialForm : ElementRef;
	@ViewChild('artForm') artForm : ElementRef;
	@ViewChild('id_grupoForm') id_grupoForm : ElementRef;
	@ViewChild('id_categoriaForm') id_categoriaForm : ElementRef;
	@ViewChild('polizaForm') polizaForm : ElementRef;
	@ViewChild('calleForm') calleForm : ElementRef;
	@ViewChild('localidadForm') localidadForm : ElementRef;
	@ViewChild('provinciaForm') provinciaForm : ElementRef;
	@ViewChild('codpForm') codpForm : ElementRef;

	constructor(
		public _helpservice : HelpService,
		public _empservice : EmpService,
		private renderer: Renderer2,
		private storage: StorageService
	) { 
		this.nominaModel = new NominaModel();	
		this.vUser = new UsuarioModel();
	}

  ngOnInit(): void {
		this.fieldSelectCall();
		setTimeout(()=>{
			this.eventError();
			if( !(this.nominaModel.id_legajo.length>0)){
				this.vUser.setCurrentSession( this.storage.getCurrentSession() );	
				this._empservice.getFileEmployee(this.vUser.getToken(),'getFileEmploye').subscribe(
					response =>{
						if( response.error == ''){
							let legajo = parseInt(response.Resulset.newFile) + 1;
							this.nominaModel.id_legajo = legajo.toString();
							this.legajo = legajo.toString();
						}
					},
					error =>{

					}				
				)
			};
		},300);
		
  }


	ngOnChanges( ):void {		
		this.nominaModel = ( this.dataModel ) ? this.dataModel : new NominaModel();
		
		if( this.nominaModel.foto ){
			this.img_foto = `${Global.urlService}godownImg/${this.nominaModel.foto}/${this.nominaModel.id_legajo}`;
		}
		if( !( parseInt( this.nominaModel.id_sector ) > 0  ) ){
			this.nominaModel.id_sector = '-1';
		}
		if( !( parseInt( this.nominaModel.id_grupo ) > 0  ) ){
			this.nominaModel.id_grupo = '-1';
		}
		if( !( parseInt( this.nominaModel.id_o_social ) > 0  ) ){
			this.nominaModel.id_o_social = '-1';
		}
		if( !( parseInt(this.nominaModel.id_jefe ) > 0 ) ){
			this.nominaModel.id_jefe = '-1';
		}
		if( !( parseInt( this.nominaModel.id_premio ) > 0 ) ){
			this.nominaModel.id_premio = '-1';
		}
		if( !( parseInt( this.nominaModel.id_almuerzo ) > 0 ) ){
			this.nominaModel.id_almuerzo = '-1';
		}
		if( !( parseInt( this.nominaModel.id_hsextra ) > 0 ) ){
			this.nominaModel.id_hsextra = '-1';
		}

	}

	/** EVENT EMITER
	* @Observations : Emito la data de employee al padre, la logica de las acciones 
	* las manipula quien llama a componente employee-data.
	*/ 
	sendEmployee( form : NgForm ):void{
		console.log('NO puedo verlo.');
		if(this.validation( form )){
			this.setFile();
			this.emitNomina.emit( this.nominaModel );
		}
	}


	/** CARGA SELECT
	* @Observations : carga desde la api tablas auxiliares para los select.
	*/ 
	async fieldSelectCall() {
		let sectores = await this._helpservice.fieldHelp( { action : 'sector'}, 'help' ).toPromise();
		let grupos = await this._helpservice.fieldHelp( { action : 'grupo'}, 'help' ).toPromise();
		let obraSocial = await this._helpservice.fieldHelp( { action : 'obrasocial'}, 'help' ).toPromise();
		let jefe = await this._helpservice.fieldHelp( { action : 'superiorjefe'}, 'help' ).toPromise(); 
		let premios = await this._helpservice.fieldHelp( { action : 'premio'}, 'help' ).toPromise(); 
		let almuerzo = await this._helpservice.fieldHelp( { action : 'almuerzo'}, 'help' ).toPromise(); 
	    let hsextra = await this._helpservice.fieldHelp( { action : 'hsextra'}, 'help' ).toPromise();
	    let categoria = await this._helpservice.fieldHelp( { action : 'categoria'}, 'help' ).toPromise();

		this.selectsector = sectores.Resultset;
		this.selectgruop = grupos.Resultset;
		this.selectosocial = obraSocial.Resultset;
		this.selectjefe = jefe.Resultset;
		this.selectpremios = premios.Resultset;
		this.selectalmuerzo = almuerzo.Resultset;
	    this.selecthsextra = hsextra.Resultset;
		this.selectcategoria = categoria.Resultset;

	}

	/** BUIL FOTO 
	* @Observations : Carga la foto seleccionada en cada cambio.
	* @param file : event input file.
	*/ 
	fileChangeEventFoto( fileInput : any ){
		this.fileToUpload = <Array<File>> fileInput.target.files;
		this.previsualizer( fileInput.target.files[0] );
	}

	/** EVENT FILE PAGE
	* @Observations : Evento change para carga de file.
	*/
	cuilChangeEvent( fileInput : any ){
		this.fileToUploadCuil = <Array<File>> fileInput.target.files;
	}

	afipChangeEvent( fileInput : any ){
		this.fileToUploadAfip = <Array<File>> fileInput.target.files;
	}

	dorsoChangeEvent( fileInput : any ){
		this.fileToUploadDorso = <Array<File>> fileInput.target.files;
	}
 
	frenteChangeEvent( fileInput : any ){
		this.fileToUploadFrente = <Array<File>> fileInput.target.files;
	}

	/** PREVISUALIZAR IMAGEN.
	* @Observations : Previsualiza la imgen seleccionada por el usuario,
	* renderiza la imagen en tiempo real.
	*/ 
	previsualizer( file : File ){
		let reader = new FileReader;
		reader.onload = (e: any) => {
			this.img_foto = e.target.result;
		};
		reader.readAsDataURL(file);
	}

	/** BUILD FILE
	* @Observations : Setea el modelo de datos con los files
	* si estos existen.
	*/ 
	setFile(){

		if( this.fileToUpload ){
			this.nominaModel.foto = this.fileToUpload;
		}else{
			this.nominaModel.foto = '';
		}

		if( this.fileToUploadCuil ){
			this.nominaModel.cert_cuil = this.fileToUploadCuil;
		}else{
			this.nominaModel.cert_cuil = '';
		}

		if( this.fileToUploadFrente ){
			this.nominaModel.foto_dni = this.fileToUploadFrente;
		}else{
			this.nominaModel.foto_dni = '';
		}

		if( this.fileToUploadDorso ){
			this.nominaModel.foto_dnidso = this.fileToUploadDorso;
		}else{
			this.nominaModel.foto_dnidso = '';
		}

		if( this.fileToUploadAfip ){
			this.nominaModel.alta_afip = this.fileToUploadAfip;
		}else{
			this.nominaModel.alta_afip = '';
		}

	}
	
	/**  VALIDATION
	 * @observations  Validaciones necesarias para Employe-data
	 *  
	 */
	validation( form : NgForm ):boolean{
		
		//console.log( this.refForm );
		//Object.entries( form.value ).forEach( ( valor : any ) =>{
		//console.log(valor);
		//});
	
		let continuo = true;

		if ( this.nominaModel.nombre == '') {
			this.renderer.addClass(this.nombreForm.nativeElement,'border-error');
			continuo = false;
		}
		
		if ( this.nominaModel.id_legajo == null || this.nominaModel.id_legajo == '') {			
			this.renderer.addClass(this.legajoForm.nativeElement,'border-error');
			continuo = false;
		}else{
			if( parseInt(this.nominaModel.id_legajo) < parseInt(this.legajo) ){
				continuo = false;
			}
		}

		if ( this.nominaModel.cuil == '' || !/^\d{11}$/.test(this.nominaModel.cuil) ) {
			this.renderer.addClass(this.cuilForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.fecha_ingreso == '') {
			this.renderer.addClass(this.fecha_ingresoForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.fecha_nacimiento == '') {
			this.renderer.addClass(this.fecha_nacimientoForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.mail == '' || !/^[a-zA-Z0-9._-]+@[a-zA-Z]+.([a-zA-Z]{2,4})+$/.test(this.nominaModel.mail) ) {
			this.renderer.addClass(this.mailForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.id_sector == '-1') {
			this.renderer.addClass(this.id_sectorForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.convenio == '') {
			this.renderer.addClass(this.convenioForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.id_o_social == '-1') {
			this.renderer.addClass(this.id_o_socialForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.art == '') {
			this.renderer.addClass(this.artForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.id_grupo == '-1') {
			this.renderer.addClass(this.id_grupoForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.id_categoria == '-1') {
			this.renderer.addClass(this.id_categoriaForm.nativeElement,'border-error');
			continuo = false;			
		}

		if ( this.nominaModel.poliza == '') {
			this.renderer.addClass(this.polizaForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.calle == '') {
			this.renderer.addClass(this.calleForm.nativeElement,'border-error');
			continuo = false;
		}
		if ( this.nominaModel.localidad == '') {
			this.renderer.addClass(this.localidadForm.nativeElement,'border-error');
			continuo = false;
		}

		if ( this.nominaModel.provincia == '') {	
			this.renderer.addClass(this.provinciaForm.nativeElement,'border-error');	 
			continuo = false;
		}
	
		if ( this.nominaModel.codp == '') {
			this.renderer.addClass(this.codpForm.nativeElement,'border-error');
			continuo = false;
		}

		return continuo;
	}
	/** EVENT DELETE ERROR BORDER
	 *  @observations saca la clase 'border-error' de los inputs/selects
	 */
	eventError(){
		this.renderer.listen( this.nombreForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.nombreForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.legajoForm.nativeElement, 'change', (event : any) => {
			if( !(parseInt(this.nominaModel.id_legajo) < parseInt(this.legajo))){
				this.renderer.removeClass( this.legajoForm.nativeElement,'border-error' );
			}else{
				this.renderer.addClass( this.legajoForm.nativeElement,'border-error' );
			}
		})
		this.renderer.listen( this.cuilForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.cuilForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.fecha_ingresoForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.fecha_ingresoForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.fecha_nacimientoForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.fecha_nacimientoForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.mailForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.mailForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.id_sectorForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.id_sectorForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.convenioForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.convenioForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.id_o_socialForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.id_o_socialForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.artForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.artForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.id_grupoForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.id_grupoForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.id_categoriaForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.id_categoriaForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.polizaForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.polizaForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.calleForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.calleForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.localidadForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.localidadForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.provinciaForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.provinciaForm.nativeElement,'border-error' );
		})
		this.renderer.listen( this.codpForm.nativeElement, 'change', (event : any) => {
			this.renderer.removeClass( this.codpForm.nativeElement,'border-error' );
		})
	}
}
