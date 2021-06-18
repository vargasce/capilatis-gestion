/** ADMINISTRATOR MODEL
 *  @observations Modelo de datos para Administradores
 */
export class AdministratorModel{

    

	constructor(
    public usuario : string,
    public pass : string,
    public nombre : string,
    public apellido : string,
    public correo : string,
		public pregunta : string,
		public respuesta : string,
    public id_extreme : string,
    public tipo : number,
    public imagen : string,
    public activo : boolean,
    public fecha_activo : string, //esto es un date
    public hora_activo : string,
    public os_activo : string,
    public plataform_activo : string,
    public t_jefe : boolean,
    public id_sector : number

	){
      this.init();
  }

    init(){
      this.usuario='';
      this.pass='';
      this.nombre='';
      this.apellido='';
      this.correo='';
      this.pregunta='';
      this.respuesta='';
      this.tipo=1;
      this.imagen='';
      this.activo=false;
      this.fecha_activo='';
      this.hora_activo='';
      this.os_activo='';
      this.plataform_activo='';
      this.t_jefe=true;
      this.id_sector=0;
			this.id_extreme = '';
    }
}
