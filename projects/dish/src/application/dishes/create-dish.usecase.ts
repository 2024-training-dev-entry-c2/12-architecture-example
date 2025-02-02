import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { IDish } from '../../domain/model/dish.model';
import { CreateDishService } from '../../infrastructure/services/create-dish.service';

@Injectable({
  providedIn: 'root',
})
export class CreateDishUsecase {
  private readonly _createDishService = inject(CreateDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(payload: IDish): void {
    this.subscriptions.add(
      this._createDishService
        .execute(payload)
        .pipe(
          tap((result) => {
            const menus = this._state.dishes.menuResponse.snapshot();
            const index = menus.findIndex((m) => m.id === payload.menuId);
            if (index !== -1) {
              const dishes = this._state.dishes.dishResponse.snapshot();
              this._state.dishes.dishResponse[index].set([
                ...dishes[index],
                result,
              ]);
            }
          })
        )
        .subscribe()
    );
  }
}
