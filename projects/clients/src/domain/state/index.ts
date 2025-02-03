import { inject, Injectable } from "@angular/core";
import { ClientsState } from "./clients.state";

//Centraliza todo el estado
@Injectable({
    providedIn: 'root'
})
export class State {
    private readonly _clients = inject(ClientsState);

    get clients(){
        return this._clients.store();
    }
}