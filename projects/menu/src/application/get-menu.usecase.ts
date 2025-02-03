import { inject, Injectable } from '@angular/core';

import { Observable, Subscription, tap } from 'rxjs';
import { GetMenuService } from '../infrastructure/services/get/get-menu.service';
import { State } from '../domain/state';
import { IAddMenuResponse, IRestaurant } from '../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class GetMenuUseCase {
  private readonly _service = inject(GetMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  restaurant$(): Observable<IRestaurant> {
    return this._state.menu.restaurant.$();
  }
  menu$(): Observable<IAddMenuResponse> {
    return this._state.menu.menu.$();
  }
  successMessage$(): Observable<string | null> {
    return this._state.menu.successMessage.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(restaurantId: number): void {
    this.subscriptions.add(
      this._service
        .execute(restaurantId)
        .pipe(
          tap((restaurant: IRestaurant) => {
            this._state.menu.restaurant.set(restaurant);
            this._state.menu.menu.set(restaurant.menuRestaurant);
            this._state.menu.dishes.set(restaurant.menuRestaurant.dishes);
          })
        )
        .subscribe()
    );
  }
}
