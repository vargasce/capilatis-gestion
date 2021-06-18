export class PermitsModuleModel{
    
    public id :number;
    public id_administrador :number;


    
    constructor(

        public empleado :boolean,
        public novedades :boolean,
        public vacaciones :boolean,
        public varios :boolean,
        public reportes :boolean,
        public administrador :boolean,     

    ){
        this.Init();
    }

    Init(){
        this.empleado = true;
        this.novedades = true;
        this.vacaciones = true;
        this.varios = true;
        this.reportes = true;
        this.administrador = true;        
    }
 }