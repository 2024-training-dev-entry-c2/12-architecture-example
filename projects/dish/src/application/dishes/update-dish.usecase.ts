import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IDish, IDishResponse } from '../../domain/model/dish.model';
import { UpdateDishService } from '../../infrastructure/services/update-dish.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishUsecase {
  private readonly _updateDishService = inject(UpdateDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  currentDish$(): Observable<IDishResponse> {
    return this._state.dishes.currentDish.$();
  }

  snapshotCurrentDish(): IDishResponse {
    return this._state.dishes.currentDish.snapshot();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dishId: number, payload: IDish): void {
    this.subscriptions.add(
      this._updateDishService
        .execute(dishId, payload)
        .pipe(
          tap((updatedDish) => {
            const menus = this._state.dishes.menuResponse.snapshot();
            const index = menus.findIndex((m) => m.id === payload.menuId);
            if (index !== -1) {
              const dishes = this._state.dishes.dishResponse.snapshot();
              const newDishes = dishes[index].map((c) =>
                c.id === updatedDish.id ? updatedDish : c
              );
              this._state.dishes.dishResponse[index].set(newDishes);
              this._state.dishes.currentDish.set(null);
            }
          })
        )
        .subscribe()
    );
  }

  selectDish(id: number, index: number): void {
    if (id === 0) {
      this._state.dishes.currentDish.set(null);
      return;
    }
    this._state.dishes.currentDish.set(
      this._state.dishes.dishResponse.snapshot()[index].find((c) => c.id === id)
    );
  }
}
