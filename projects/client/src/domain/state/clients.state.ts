import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IClient } from "../model/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientsState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly client$ = new BehaviorSubject<IClient[]>([]);
  private readonly Oneclient$ = new BehaviorSubject<IClient>(null);
  //#endregion

  store() {
    return {
      client: this._factory.state(this.client$),
      Oneclient$: this._factory.state(this.Oneclient$)
    }
  }
}