import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IClient } from "../model/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly clients$ = new BehaviorSubject<IClient[]>([]);

  //#endregion

  store() {
    return {
      allClient: this._factory.state(this.clients$),
    
    }
  }
}