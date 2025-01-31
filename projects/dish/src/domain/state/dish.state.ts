import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IDish } from "../model/dish.model";
import { StateFactory } from "shared";
import { IMenu } from "../model/menu.model";

@Injectable({
  providedIn: 'root'
})
export class DishState {
  private readonly _factory = inject(StateFactory); 

  //#region Subjects
  private readonly dishes$ = new BehaviorSubject<IDish[]>([null]);
  private readonly message$ = new BehaviorSubject<string>(null);
  private readonly currentDish$ = new BehaviorSubject<IDish>(null);
  private readonly open$ = new BehaviorSubject<boolean>(false);
  private readonly listMenus$ = new BehaviorSubject<IMenu[]>(null);
  private readonly menu$ = new BehaviorSubject<IMenu>(null);
  //#endregion

  store() {
    return {
      listDishes: this._factory.state(this.dishes$),
      message: this._factory.state(this.message$),
      currentDish: this._factory.state(this.currentDish$),
      open: this._factory.state(this.open$),
      listMenus: this._factory.state(this.listMenus$),
      menu: this._factory.state(this.menu$),
    }
  }
}