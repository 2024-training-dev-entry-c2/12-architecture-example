import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IClient } from "../model/client.model";

@Injectable({
    providedIn: 'root'
})
export class ClientState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly clients$ = new BehaviorSubject<IClient[]>([]);
    private readonly currentClient$ = new BehaviorSubject<IClient | null>(null);
    private readonly open$ = new BehaviorSubject<boolean>(false);
    private readonly message$ = new BehaviorSubject<string>('');
    //#endregion

    store() {
        return {
            showClients: this._factory.state(this.clients$),
            currentClient: this._factory.state(this.currentClient$),
            open: this._factory.state(this.open$),
            message: this._factory.state(this.message$)
        }
    }
}