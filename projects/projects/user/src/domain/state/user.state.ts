import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IAuth } from "../model/IAuth";
import { StateFactory } from "./state.factory";



@Injectable({
  providedIn: 'root'
})
export class UsersState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly auth$ = new BehaviorSubject<IAuth>(null);
  private readonly userSave$ = new BehaviorSubject<IAuth>(null);
  //#endregion

  store() {
    return {
      auth: this._factory.state(this.auth$),
      userSave: this._factory.state(this.userSave$)
    }
  }
  
}