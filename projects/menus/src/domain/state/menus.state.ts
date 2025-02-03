import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IMenu } from "../model/menus.model";


@Injectable({
    providedIn: 'root'
})
export class MenusState {
    //constantes
    private readonly _factory = inject(StateFactory);

    //#region subjects
    // Flujo reactivo, estado de los clientes
    private readonly menu$ = new BehaviorSubject<IMenu[]>([]);//si pongo null en tsconfig debo cambiar strict a false 
    private readonly currentMenu$ = new BehaviorSubject<IMenu>(null);
    //pasa todos los subjet por el factory
    store(){
        return {
            menu: this._factory.state(this.menu$),
            currentMenu: this._factory.state(this.currentMenu$)
        }
    }
    //#endregion subjects
}