import { inject, Injectable } from "@angular/core";
import { MenusState } from "./menu.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _menus = inject(MenusState);

  get menus() {
    return this._menus.store();
  }
}