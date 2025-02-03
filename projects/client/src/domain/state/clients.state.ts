import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IClient } from "../model/clients.model";

@Injectable({
    providedIn: 'root'
})
export class ClientState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly client$ =  new BehaviorSubject<IClient[]>([]);
    //#endregion

    store() {
        return {
            client: this._factory.state(this.client$)
        }
    }
}