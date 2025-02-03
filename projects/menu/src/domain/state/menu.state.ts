import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IMenu } from "../model/menu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly menus$ = new BehaviorSubject<IMenu[]>([]);
  private readonly currentMenu$ = new BehaviorSubject<IMenu>(null);
  //#endregion

  store() {
    return {
      allMenus: this._factory.state(this.menus$),
      currentMenu: this._factory.state(this.currentMenu$)
    }
  }

  resetCurrentMenu() {
    this.currentMenu$.next(null);
  }
}