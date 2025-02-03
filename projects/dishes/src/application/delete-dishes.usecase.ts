import { inject, Injectable } from "@angular/core";
import {IDish } from '../domain/model/dishes.model';
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { DeleteDishesService } from "../infrastructure/services/delete-dishes.service";


@Injectable(
  {providedIn: 'root'}
)
export class DeleteDishesUseCase {
  private readonly _service = inject(DeleteDishesService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;


  currentDishes$(): Observable<IDish> {
    return this._state.dishesState.currentDishes.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dish: IDish): void {
    this._state.dishesState.currentDishes.set(dish);
    this.subscriptions.add(
      this._service.execute(dish.id)
        .pipe(
          tap(() => {
            const selectdishes = this._state.dishesState.currentDishes.snapshot();
            const dishes = this._state.dishesState.dishes.snapshot().filter(c => c.id !== selectdishes.id);
            this._state.dishesState.dishes.set(dishes);
            this._state.dishesState.currentDishes.set(null);
          }),
        ).subscribe()
    );
  }

}
