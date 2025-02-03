import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IMenu } from "../model/menu.model";
import { StateFactory } from "shared";

@Injectable({
  providedIn: 'root'
})
export class MenuState {
  private readonly _factory = inject(StateFactory); 

  //#region Subjects
  private readonly menus$ = new BehaviorSubject<IMenu[]>(null);
  private readonly message$ = new BehaviorSubject<string>(null);
  private readonly currentMenu$ = new BehaviorSubject<IMenu>(null);
  private readonly open$ = new BehaviorSubject<boolean>(false);
  //#endregion

  store() {
    return {
      listMenus: this._factory.state(this.menus$),
      message: this._factory.state(this.message$),
      currentMenu: this._factory.state(this.currentMenu$),
      open: this._factory.state(this.open$)
    }
  }
}