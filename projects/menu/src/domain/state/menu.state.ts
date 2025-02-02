import { BehaviorSubject } from 'rxjs';
import { IMenu } from '../model/menu.model';
import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class MenuState {
  private readonly _factory = inject(StateFactory);
  private readonly menu$ = new BehaviorSubject<IMenu[]>([]);
  private readonly currenMenu$ = new BehaviorSubject<IMenu>(null);

  store() {
    return {
      menu: this._factory.state(this.menu$),
      currenMenu: this._factory.state(this.currenMenu$),
    };
  }
}
