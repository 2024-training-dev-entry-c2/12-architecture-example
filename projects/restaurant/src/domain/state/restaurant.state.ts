import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IAddMenuResponse, IDish, IRestaurant } from "../model/restaurant.model";

@Injectable({
  providedIn: 'root'
})
export class RestaurantState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly restaurant$ = new BehaviorSubject<IRestaurant>(null);
  private readonly currentRestaurant$ = new BehaviorSubject<IRestaurant>(null);
  private readonly address = new BehaviorSubject<string>('');
  private readonly openingDate$ = new BehaviorSubject<string | null>(null);
  private readonly closingDate$ = new BehaviorSubject<string | null >(null);
  private readonly menu$ = new BehaviorSubject<IAddMenuResponse>(null);
  private readonly popularDishes$ = new BehaviorSubject<IDish[]>([]);
  //#endregion

  store() {
    return {
      restaurant: this._factory.state(this.restaurant$),
      currentRestaurant: this._factory.state(this.restaurant$),
      address: this._factory.state(this.address),
      openingDate : this._factory.state(this.openingDate$),
      closingDate: this._factory.state(this.closingDate$),
      menu: this._factory.state(this.menu$),
      popularDishes : this._factory.state(this.popularDishes$)
    }
  }
}
