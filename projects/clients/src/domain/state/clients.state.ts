import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IClient } from "../model/client.model";
import { StateFactory} from 'shared';

@Injectable({
    providedIn: 'root'
})
export class ClientsState{
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly clients$ = new BehaviorSubject<IClient[]>([]);
    private readonly currentClient$ = new BehaviorSubject<IClient>(null);
    //#endregion

    store(){
        return {
            clients: this._factory.state(this.clients$),
            currentClient: this._factory.state(this.currentClient$)
        };
    }
}