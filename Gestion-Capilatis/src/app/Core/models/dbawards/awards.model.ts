export class AwardsModel{

    public id_premio : 	number;       
    public fecha_update : Date;


    constructor(

        public id_legajo : string,
        public premio : number,
        public fecha_carga : Date,
        public usuario_carga : string,	
        public usuario_update : string,
        public periodo : Date,
    ){
        this.init();
    }

    init(){
        this.premio = 0;
        this.usuario_carga = '';
        this.usuario_update = '';
    }
}