import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IDish } from "../model/dishes.model";

@Injectable({
    providedIn: 'root'
})
export class DishesState {
    //constantes
    private readonly _factory = inject(StateFactory);

    //#region subjects
    // Flujo reactivo, estado de los clientes
    private readonly dish$ = new BehaviorSubject<IDish[]>([]);//si pongo null en tsconfig debo cambiar strict a false 
    private readonly currentDish$ = new BehaviorSubject<IDish>(null);
    //pasa todos los subjet por el factory
    store(){
        return {
            dish: this._factory.state(this.dish$),
            currentDish: this._factory.state(this.currentDish$)
        }
    }
    //#endregion subjects
}