import { Component, OnInit, Output, EventEmitter, ViewChild, Renderer2} from '@angular/core';



@Component({
  selector: 'app-search-custom',
  templateUrl: './search-custom.component.html',
  styleUrls: ['./search-custom.component.scss']
})
export class SearchCustomComponent implements OnInit {


	@Output() searchDescription = new EventEmitter<any>();
	@ViewChild('descripcion') descripcion : any;


	


	constructor(
		private renderer : Renderer2,

	) { 

	}

  ngOnInit(): void {
		setTimeout( ()=>{
			this.subscriveEvent();
		},200);
  }

	ngOnDestroy(){
	}


	/** SUBSCRIVE EVENT
	 * @Obsertaions : Ejecuta subscripcion de eventos para los inputs si es necesario.
	 */ 
	subscriveEvent(){
		this.renderer.listen( this.descripcion.nativeElement, 'keyup', ( event ) =>{
			this.searchDescription.emit( this.descripcion.nativeElement.value );
		});

	}

}
