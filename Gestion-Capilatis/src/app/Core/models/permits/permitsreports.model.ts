export class PermitsReportsModel{
    
    public id :number;
    public id_administrador :number;



    constructor(

        public novedades :boolean,
        public vacaciones :boolean,
        public cumples :boolean,

    ){
        this.init();
    }

    init(){
        this.novedades = true;
        this.vacaciones = true;
        this.cumples = true;
    }
 }