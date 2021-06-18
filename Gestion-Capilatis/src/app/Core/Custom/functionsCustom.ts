import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FuntionsCustom {


    constructor(

    ){}
        /** FILTER CUSTOM
         * @observations Filtra un obj y me retorna un newObj que cumple las condiciones dadas
         *  TODAVIA NO ES CUSTOM
         * @param parametro parametro que uso para filtrar
         * @param obj tuplas a filtrar
         * @param valor condicion para filtrado
         */
        filterCustom(obj : any, valor : any){
            let newObj =   obj.filter (( obj ) => {return obj.activo == valor});

            return newObj;
        }

}