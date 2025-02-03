import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IState } from "../models/state.model";

//Crear state que cumpla con la interfaz del model, inyectar dependencia en el constructor
@Injectable({
    providedIn: 'root'
})
//se pone la logica para que los estados lleguen de la forma del modelo
export class StateFactory {
   state<T>(subject$: BehaviorSubject<T>): IState<T> {
    return {
        $: () => subject$.asObservable(),
        snapshot: () => this.immutabilize(subject$.getValue()),
        set: (value: T) => subject$.next(this.immutabilize(value))
    }
   }
   //Recibe payload y lo convierte en un objeto inmutable
   private immutabilize<T>(value: T): T {
       return JSON.parse(JSON.stringify(value));//para eliminar referencias en memoria, copia por valor y no la referencia
   }
}