import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../model/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly user$ = new BehaviorSubject<IUser>(null);
  private readonly userfgdsadf$ = new BehaviorSubject<IUser>(null);
  private readonly usesaefsdffr$ = new BehaviorSubject<IUser>(null);
  //#endregion

  store() {
    return {
      user: this._factory.state(this.user$),
      userfgdsadf: this._factory.state(this.userfgdsadf$),
      usesaefsdffr: this._factory.state(this.usesaefsdffr$)
    }
  }
}