import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { UpdateDishesService } from "../infrastructure/services/update-dishes.service";
import { ICreateDish } from "../domain/model/create-dishes";
import { IDish } from "../domain/model/dishes.model";

@Injectable(
  {providedIn: 'root'}
)
export class UpdateDishesUseCase {

  private readonly _service = inject(UpdateDishesService);
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

  execute(id: number, body: ICreateDish): void {
    this.subscriptions.add(
      this._service.execute(id, body)
        .pipe(
          tap(() => {
            const dishes = this._state.dishesState.currentDishes.snapshot();
            const allDishes = this._state.dishesState.dishes.snapshot();
            this._state.dishesState.dishes.set(allDishes.filter(d => d.id !== dishes.id));
            this._state.dishesState.currentDishes.set(null);
          }),
        ).subscribe()
    );
  }

}
