import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IMenu } from "../model/menu.model";

@Injectable({
  providedIn: 'root'
})
export class MenusState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly menu$ = new BehaviorSubject<IMenu[]>([]);
  private readonly OneMenu$ = new BehaviorSubject<IMenu>(null);
  //#endregion

  store() {
    return {
      menu: this._factory.state(this.menu$),
      OneMenu$: this._factory.state(this.OneMenu$)
    }
  }
}