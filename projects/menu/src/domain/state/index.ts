import { inject, Injectable } from "@angular/core";
import { MenuState } from "./menus.state";


@Injectable({
  providedIn: 'root'
})
export class State{
  private readonly _menu = inject(MenuState);


  get menuState(){
    return this._menu.store();
  }
}
