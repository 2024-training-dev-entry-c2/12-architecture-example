import { inject, Injectable } from "@angular/core";
import { RestaurantState } from "./restaurant.state";


@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _restaurant = inject(RestaurantState);

  get restaurant() {
    return this._restaurant.store();
  }
}
