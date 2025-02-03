import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { UpdateDishService } from '../../infrastructure/services/update-dish.service';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteDishUsecase {
  private readonly _updateDishService = inject(UpdateDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dishId: number, payload: IDish, index: number): void {
    this.subscriptions.add(
      this._updateDishService
        .execute(dishId, payload)
        .pipe(
          tap(() => {
            const dishes = this._state.dishes.dishResponse.snapshot();
            dishes[index] = dishes[index].filter((d) => d.id !== dishId);
            this._state.dishes.dishResponse.set(dishes);
          })
        )
        .subscribe()
    );
  }
}
