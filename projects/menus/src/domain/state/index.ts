import { inject, Injectable } from "@angular/core";
import { MenuState } from "./menu.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _menu = inject(MenuState);

  get menus() {
    return this._menu.store();
  }
}