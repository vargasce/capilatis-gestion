export class StudyModel {

    public id_estudio : number;
    public id_legajo : string;
    	
    	
    
    
    

    constructor(

        public dias : number,
        public certificado	: boolean,
        public detalles : string,
        public usuario_carga : string,	
        public usuario_update : string,
        public fecha_update : Date,
        public fecha_carga : Date,
        public fecha : Date,

    ){
        this.init();
    }

    init(){

        this.dias = 15;
        this.certificado = false;
        this.detalles = '';
        this.usuario_carga ='';
        this.usuario_update ='';

    }
}