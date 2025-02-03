import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../model/users.model";
import { IUserSystem } from "../model/user-system.model";
import { IAuthenticateOut } from "../model/authenticate-out.modle";

@Injectable({
  providedIn: 'root'
})
export class UsersState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly user$ = new BehaviorSubject<IUser>(null);
  private readonly listUsersSytems$ = new BehaviorSubject<IUserSystem>(null);
  private readonly authenticateOut$ = new BehaviorSubject<IAuthenticateOut>(null);
  //#endregion

  store() {
    return {
      user: this._factory.state(this.user$),
      listUsersSytems: this._factory.state(this.listUsersSytems$),
      authenticateOut: this._factory.state(this.authenticateOut$)
    }
  }
}