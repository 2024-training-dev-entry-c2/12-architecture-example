import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IClient } from "../model/clients.model";

@Injectable({
    providedIn: 'root'
})
export class ClientsState {
    //constantes
    private readonly _factory = inject(StateFactory);

    //#region subjects
    // Flujo reactivo, estado de los clientes
    private readonly client$ = new BehaviorSubject<IClient[]>([]);//si pongo null en tsconfig debo cambiar strict a false 
    private readonly currentClient$ = new BehaviorSubject<IClient>(null);
    //pasa todos los subjet por el factory
    store(){
        return {
            client: this._factory.state(this.client$),
            currentClient: this._factory.state(this.currentClient$)
        }
    }
    //#endregion subjects
}