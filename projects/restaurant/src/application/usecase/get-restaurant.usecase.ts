import { inject, Injectable } from '@angular/core';
import { RestaurantService } from '../../infrastructure/services/restaurant.service';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IRestaurant } from '../../domain/model/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class GetRestaurantUseCase {
  private readonly _service = inject(RestaurantService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  restaurant$(): Observable<IRestaurant> {
    return this._state.restaurant.restaurant.$();
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
            this._state.restaurant.currentRestaurant.set(restaurant);
          })
        )
        .subscribe()
    );
  }
}
