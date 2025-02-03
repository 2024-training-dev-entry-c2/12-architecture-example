import { inject, Injectable } from "@angular/core";
import { DishState } from "./dish.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _dishes = inject(DishState);

  get dishes() {
    return this._dishes.store();
  }
}