export class PermitsNewsModel{
    
    public id :number;
    public id_administrador :number;



    constructor(

        public carga_general :boolean,
        public premios :boolean,
        public presentismo :boolean,
        public almuerzo :boolean,
        public horas_extras :boolean,
        public aceptacion_masiva :boolean,
        public dias_estudio :boolean,
        public licencias :boolean,

    ){
        this.Init();
    }

    Init(){
        this.carga_general = true;
        this.premios = true ;
        this.presentismo = true;
        this.almuerzo = true;
        this.horas_extras = true; 
        this.aceptacion_masiva = true; 
        this.dias_estudio = true;
        this.licencias = true;
    }
 }