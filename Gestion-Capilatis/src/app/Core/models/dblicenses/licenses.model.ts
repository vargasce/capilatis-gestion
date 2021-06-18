export class LicensesModel{

    public id_licencia : number;
    public id_legajo : string;
    
    
    

    constructor(
        public dias : number,
        public motivo : string,
        public certificado : boolean,
        public usuario_carga : string,
        public usuario_update : string,
        public fecha_update : Date,
        public fecha_carga : Date,
        public fecha : Date,
    ){
        this.init();
    }

    init(){

        this.dias = 0;
        this.motivo = '';
        this.certificado = false;
        this.usuario_carga = '';
        this.usuario_update = '';

    }
}