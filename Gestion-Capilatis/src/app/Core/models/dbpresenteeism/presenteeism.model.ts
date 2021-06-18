export class PresenteeismModel {

    public id_presentismo : number;	
    public id_legajo : string;	       
    

    constructor(
        public presentismo : boolean,
        public usuario_update : string,	
        public usuario_carga : string,
        public periodo	: Date,
        public fecha_carga	: Date,
        public fecha_update : Date,
    ){
        this.init();
    }

    init(){
        this.presentismo = false;
        this.usuario_update = '';
        this.usuario_carga = '';

    }
}