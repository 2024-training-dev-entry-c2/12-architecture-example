import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IResponse, StateFactory } from "shared";
import { IClient } from "../model/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientState {
  private readonly _factory = inject(StateFactory); 

  //#region Subjects
  private readonly clients$ = new BehaviorSubject<IClient[]>(null);
  private readonly message$ = new BehaviorSubject<string>(null);
  private readonly currentClient$ = new BehaviorSubject<IClient>(null);
  private readonly open$ = new BehaviorSubject<boolean>(false);
  //#endregion

  store() {
    return {
      listClients: this._factory.state(this.clients$),
      message: this._factory.state(this.message$),
      currrentClient: this._factory.state(this.currentClient$),
      open: this._factory.state(this.open$)
    }
  }
}