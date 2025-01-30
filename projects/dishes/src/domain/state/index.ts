import { inject, Injectable } from "@angular/core";
import { DishState } from "./dish.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _dish = inject(DishState);

  get dishes_list() {
    return this._dish.store();
  }
}