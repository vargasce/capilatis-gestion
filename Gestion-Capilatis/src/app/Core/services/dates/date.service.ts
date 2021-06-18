import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
    
})
export class DateService {

   public date: Date;
   public url: string;
   
    constructor (
    ){
       this.date = new Date();
    }
    
    
    /** SET DATE
     * @observations devuelve un string con la fecha deseada
     * @formato yyyy-mm-dd
     * @param yyyy anio
     * @param mm mes
     * @param dd dia
     */
    setDate(yyyy:number , mm:number , dd:number){
        return (yyyy + "-" + mm + "-" + dd );
    }

    /** UPDATE DATE
     *  @observations retorna la fecha del dia actual en  string
     *  @formato 2018-08-23T23:27:29.390Z
     */
    updateDate(){
        return  this.date.toISOString();
    }

    /** FORMATO ISO
     * @observations retorna un string en formato USO 8601
     * @formato 2018-08-23T23:27:29.390Z
     * @param date fecha a devolver en formato STRING
     */
    formatISO( date : Date){
        return  date.toISOString();
    }

    /** FORMATO PRESENTASION
     * @observations retorna un string con la fecha en formato presentacion
     * @formato Fri Aug 24 2018
     * @param date fecha a formatear en string
     */
    formatPresentation( date: Date ){
        return date.toDateString()
    }

    serializableDateFormat( fecha : string):string{
        let dateFormat = new Date(fecha);
        let dia = ("0" + dateFormat.getDate().toString()).slice(-2);
        let mes = ("0" + (dateFormat.getMonth() + 1 ).toString()).slice(-2);
        let anio = dateFormat.getFullYear().toString();
        return anio + "-" + mes + "-" + dia
    }

    /** SERIALIZABLE ACTUAL DATE FORMAT
     * @observations Retorna la fecha actual de forma serializada
     */
    serializableActualDateFormat(){
        return this.serializableDateFormat(this.updateDate())
    }
    /** DATE COMPARATOR
     * @Observations :
     * @param since 
     * @param until
     * @returns TRUE if until > since or until = since // FALSE if since > until
     */
    dateComparator( since : Date, until: Date){
        let continuo = true;
            if (  (until.getFullYear() >= since.getFullYear()) ){
                if(  (until.getMonth() + 1 >= since.getMonth() + 1) ){
                    if( !(until.getDate() >= since.getDate())){
                        continuo = false;
                    }
                }else{
                    continuo = false;
                }
            }else{
                continuo = false;
            };
        
        return continuo;
    }
    /** SERIALIZABLE DATA FORMAT2
     * @observations Devuelve la fecha con el formato 2020-05  ( anio + mes )
     * @param fecha : <Date>
     * @returns anio - mes
     */
    serializableDateFormat2( fecha : Date):string{
        let dateFormat = new Date(fecha)
        let mes = ("0" + (dateFormat.getMonth() + 1 ).toString()).slice(-2);
        let anio = dateFormat.getFullYear().toString();
        return anio + "-" + mes
    }
    



}