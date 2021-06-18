export class PermitsEmployeeModel{
    
    public id :number;
    public id_administrador :number;


    constructor(

        public empleado_activo :boolean,
        public empleado_inactivo :boolean,
        public nuevo_empleado :boolean,

    ){
        this.Init();
    }

    Init(){
        this.empleado_activo = true;
        this.empleado_inactivo = true;
        this.nuevo_empleado = true;
    
    }
 }