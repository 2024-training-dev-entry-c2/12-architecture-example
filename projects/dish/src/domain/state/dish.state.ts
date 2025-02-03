import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IDish, IMenu } from "../model/dish.model";

@Injectable({
  providedIn: 'root'
})
export class DishState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly dishes$ = new BehaviorSubject<IDish[]>([]);
  private readonly currentDish$ = new BehaviorSubject<IDish>(null);
  private readonly allMenus$ = new BehaviorSubject<IMenu[]>([]);
  //#endregion

  store() {
    return {
      allDishes: this._factory.state(this.dishes$),
      currentDish: this._factory.state(this.currentDish$),
      allMenus: this._factory.state(this.allMenus$)
    }
  }

  resetCurrentMenu() {
    this.currentDish$.next(null);
  }
}