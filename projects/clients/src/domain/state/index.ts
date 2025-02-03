import { inject, Injectable } from "@angular/core";
import { ClientsState } from "./clients.state";

@Injectable({
    providedIn: 'root'
})
export class State{
    private readonly __clients = inject(ClientsState);

    get clients() {
        return this.__clients.store();
    }
}