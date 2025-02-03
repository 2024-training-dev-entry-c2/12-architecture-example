import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IMenu } from "../model/menu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuState{
  private readonly _factory = inject(StateFactory);
  private readonly menu$ = new BehaviorSubject<IMenu[]>([]);
  private readonly currentMenu$ = new BehaviorSubject<IMenu>(null);

  store(){
    return{
      menu: this._factory.state(this.menu$),
      currentMenu: this._factory.state(this.currentMenu$)
    }
  }

}
