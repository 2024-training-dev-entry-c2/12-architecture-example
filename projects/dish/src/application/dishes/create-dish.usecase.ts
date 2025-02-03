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

  execute(payload: IDish, index: number): void {
    this.subscriptions.add(
      this._createDishService
        .execute(payload)
        .pipe(
          tap((result) => {
            const dishes = this._state.dishes.dishResponse.snapshot();
            dishes[index] = [...dishes[index], result];
            this._state.dishes.dishResponse.set(dishes);
          })
        )
        .subscribe()
    );
  }
}
