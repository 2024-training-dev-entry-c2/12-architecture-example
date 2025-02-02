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

  execute(dishId: number, payload: IDish): void {
    this.subscriptions.add(
      this._updateDishService
        .execute(dishId, payload)
        .pipe(
          tap(() => {
            const menus = this._state.dishes.menuResponse.snapshot();
            const index = menus.findIndex((m) => m.id === payload.menuId);
            if (index !== -1) {
              const dishes = this._state.dishes.dishResponse.snapshot();
              this._state.dishes.dishResponse[index].set(
                dishes[index].filter((d) => d.id !== dishId)
              );
            }
          })
        )
        .subscribe()
    );
  }
}
