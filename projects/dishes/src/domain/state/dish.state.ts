import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IDish } from "../model/dish.model";

@Injectable({
  providedIn: 'root'
})
export class DishState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly dish$ = new BehaviorSubject<IDish>(null);

  //#endregion

  store() {
    return {
      dish: this._factory.state(this.dish$),

    }
  }
}