import { inject, Injectable } from '@angular/core';
import { StateIndesDish } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { Idish } from '../domain/model/dish.model';
import { UpdateDishService } from '../infrastructure/services/update-dish.service';

@Injectable({ providedIn: 'root' })
export class UpdateDishUseCase {
  private readonly _service = inject(UpdateDishService);
  private readonly _state = inject(StateIndesDish);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  dishCurrent$(): Observable<Idish> {
    return this._state.dishState.dishUnique.$();
  }

  execute(dish: Idish): void {
    this.subscriptions.add(
      this._service
        .execute(dish)
        .pipe(
          tap((dish) => {
            const dishes = this._state.dishState.dishes.valueState();
            const newDish = dishes.map((d) => (d.id === dish.id ? dish : d));
            this._state.dishState.dishes.changeState(newDish);
            this._state.dishState.dishUnique.changeState(null);
          })
        )
        .subscribe()
    );
  }

  selectDish(id: number): void {
    const dishActual = this._state.dishState.dishes
      .valueState()
      .find((d) => d.id === id);
    this._state.dishState.dishUnique.changeState(dishActual);
  }
}
