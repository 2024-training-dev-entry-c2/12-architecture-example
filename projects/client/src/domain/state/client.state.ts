import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { Iclient, IUser } from "../model/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly client$ = new BehaviorSubject<Iclient>(null);
  // private readonly userfgdsadf$ = new BehaviorSubject<IUser>(null);
  // private readonly usesaefsdffr$ = new BehaviorSubject<IUser>(null);
  //#endregion

  store() {
    return {
      user: this._factory.state(this.client$),
      // userfgdsadf: this._factory.state(this.userfgdsadf$),
      // usesaefsdffr: this._factory.state(this.usesaefsdffr$)
    }
  }
}