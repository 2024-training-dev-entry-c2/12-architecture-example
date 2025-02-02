import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { State } from '../domain/state';
import { IDish } from '../domain/model/menu.model';
import { DeleteDishService } from '../infrastructure/services/delete/delete-dish.service';


@Injectable({
  providedIn: 'root',
})
export class DeleteDishUseCase {
  private readonly _service = inject(DeleteDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentDish$(): Observable<IDish> {
    return this._state.menu.currentDish$.$();
  }

  successMessage$(): Observable<string | null> {
    return this._state.menu.successMessage.$();
  }
  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  execute(id: number): void {
    this.subscriptions.add(
      this._service.deleteDishById(id)
        .pipe(
          tap(() => {
            const currentDishes = this._state.menu.dishes.snapshot();
            const updatedDishes = currentDishes.filter(dish => dish.id !== id);
            this._state.menu.dishes.set(updatedDishes);
          })
        )
        .subscribe()
    );
  }
  selectDish(id: number): void {
    const currentDish = this._state.menu.dishes
      .snapshot()
      .find((dish) => dish.id === id);
    this._state.menu.currentDish$.set(currentDish);
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
