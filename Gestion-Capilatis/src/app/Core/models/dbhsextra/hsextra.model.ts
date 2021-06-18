export class HsextraModel{

    public id_hsextra : number;
    public id_legajo : string;
    



    constructor(
        public periodo : Date,
        public hsextra : number,	
        public usuario_carga : string,	
        public fecha_carga : Date,
        public usuario_update : string,	
        public fecha_update : Date,

    ){
        this.init();
    }

    init(){
        this.hsextra = 0;
        this.usuario_carga = '';
        this.usuario_update = '';
    }
}