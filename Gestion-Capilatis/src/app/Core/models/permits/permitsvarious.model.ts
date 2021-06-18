export class PermitsVariousModel{
    
    public id :number;
    public id_administrador :number;


    constructor(

        public indumentaria:boolean,
        public recibos_sueldo:boolean,
        public fecha_especiales:boolean,

    ){
        this.init();
    }

    init(){
        this.indumentaria = true;
        this.recibos_sueldo = true;
        this.fecha_especiales = true;
    }
 }