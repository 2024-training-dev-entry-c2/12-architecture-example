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
  private readonly clients$ = new BehaviorSubject<IClient[]>([]);


  //#endregion

  store() {
    return this._factory.state(this.clients$);
  }
}
