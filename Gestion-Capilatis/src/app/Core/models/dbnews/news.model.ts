

export class NewsModel{

        public id_novedad : number;
        public id_legajo : string;
        public fecha_novedad : Date;
        public fecha_carga : Date;
        public fecha_update : Date;        
        public id_origen : number;

    constructor (
        public novedad : string,
        public informado : boolean,
        public usuario_carga : string,
        public usuario_update : string,
        public activo : boolean,
        public origen : string,

    ){  
        this.init()
      }

    init(){
        this.novedad = '';
        this.informado = false;
        this.usuario_carga = '';
        this.usuario_update = '';
        this.activo = true;
        this.origen = '';
    }
    
}