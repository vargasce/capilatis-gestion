export class PermitsAdministratorModel{
    
   public id :number;
   public id_administrador :number;


   constructor(

      public nuevo_administrador :boolean,
      public lista_usuario :boolean,
      public respaldo_bd :boolean,
      public logs : boolean,
      public assets : boolean,

   ){
      this.Init();
   }

   Init(){
      this.nuevo_administrador = true;
      this.lista_usuario = true;
      this.respaldo_bd = true;
      this.logs = true;
      this.assets = true;
   }
}