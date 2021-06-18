export class PermitsHolidaysModel{
    
    public id :number;
    public id_administrador :number;


    constructor(

        public carga_vacaciones :boolean,
        public listado_vacaciones :boolean,
        public vacaciones_gozadas :boolean,

    ){
        this.Init();
    }

    Init(){
        this.carga_vacaciones = true;
        this.listado_vacaciones = true;
        this.vacaciones_gozadas = true;
    }
 }