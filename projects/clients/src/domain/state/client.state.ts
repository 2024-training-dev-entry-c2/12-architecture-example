import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { IClients } from "../model/clients.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientsState {
    private readonly _factory = inject(StateFactory);
    
    
    private readonly _client$ = new BehaviorSubject<IClients[]>([]); 

    store() {
        return {
            client: this._factory.state(this._client$)
        }
    }
}