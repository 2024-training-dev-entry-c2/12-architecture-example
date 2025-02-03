import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import{ IDish } from "../model/dishes.model";

@Injectable({
  providedIn: 'root'
})
export class DishesState{
  private readonly _factory = inject(StateFactory);
  private readonly dishes$ = new BehaviorSubject<IDish[]>([]);
  private readonly currentDishes$ = new BehaviorSubject<IDish>(null);

  store(){
    return{
      dishes: this._factory.state(this.dishes$),
      currentDishes: this._factory.state(this.currentDishes$)
    }
  }

}
