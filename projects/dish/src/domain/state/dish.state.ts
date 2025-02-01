
import { inject, Injectable } from '@angular/core';
import { StateFacotory } from 'shared';
import { Idish } from '../model/dish.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DishState {
  private readonly _stateFactory = inject(StateFacotory);

  //#region State
  private readonly dishes$ = new BehaviorSubject<Idish[]>([]);
  private readonly dishUnique = new BehaviorSubject<Idish>(null);
  //#endregion

  store(){
    return{
      dishes: this._stateFactory.stateFunctions(this.dishes$),
      dishUnique: this._stateFactory.stateFunctions(this.dishUnique)
    }
  }

}
