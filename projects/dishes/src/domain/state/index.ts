import { inject, Injectable } from "@angular/core";
import { DishState } from "./dish.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _users = inject(DishState);

  get users() {
    return this._users.store();
  }
}