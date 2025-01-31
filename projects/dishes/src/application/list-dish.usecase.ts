import { inject, Injectable } from '@angular/core';
import { ListDishService } from '../infrastructure/services/list/list-dish.service';

import { Observable, Subscription, tap } from 'rxjs';
import { IDish, State } from '../public-api';

@Injectable({
  providedIn: 'root',
})
export class ListDishesUseCase {
  private readonly _service = inject(ListDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  dishes$(): Observable<IDish[]> {
    return this._state.dishes_list.dishes.$();
  }
  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .getDishes()
        .pipe(
          tap((dishes: IDish[]) => {
            this._state.dishes_list.dishes.set(dishes);
          })
        )
        .subscribe(
          (dishes: IDish[]) => {
            this._state.dishes_list.dishes.set(dishes);
          },
          (err) => {
            console.error('Error al obtener menús:', err);
          }
        )
    );
  }
}
