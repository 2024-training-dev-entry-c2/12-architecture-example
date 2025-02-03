import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IOrder } from "../models/orders.model";

@Injectable({
    providedIn: 'root'
})
export class OrdersState {
    //constantes
    private readonly _factory = inject(StateFactory);

    //#region subjects
    // Flujo reactivo, estado de los clientes
    private readonly order$ = new BehaviorSubject<IOrder[]>([]);//si pongo null en tsconfig debo cambiar strict a false 
    private readonly currentOrder$ = new BehaviorSubject<IOrder>(null);
    //pasa todos los subjet por el factory
    store(){
        return {
            order: this._factory.state(this.order$),
            currentOrder: this._factory.state(this.currentOrder$)
        }
    }
    //#endregion subjects
}