import { inject, Injectable } from '@angular/core';
import { StateIndesDish } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { Idish } from '../domain/model/dish.model';
import { CreateDishService } from '../infrastructure/services/create-dish.service';

@Injectable({ providedIn: 'root' })
export class CreateDishesUseCase {
  private readonly _service = inject(CreateDishService);
  private readonly _state = inject(StateIndesDish);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dish: Idish): void {
    this.subscriptions.add(
      this._service
        .execute(dish)
        .pipe(
          tap((dishd) => {
            const dishes = this._state.dishState.dishes.valueState();
            this._state.dishState.dishes.changeState([...dishes, dishd]);
          })
        )
        .subscribe()
    );
  }
}
