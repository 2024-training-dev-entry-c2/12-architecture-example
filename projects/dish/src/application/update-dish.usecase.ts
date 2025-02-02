import { inject, Injectable } from '@angular/core';
import { UpdateDishService } from '../infrastructure/services/update-dish.service';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { IDish } from '../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishUseCase {
  private readonly _service = inject(UpdateDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region observables
  currentDish$(): Observable<IDish> {
    return this._state.dishesState.currentDish.$();
  }
  //#endregion

  //#region Public methods
  initSubscriptions() {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }

  execute(dish: IDish, modal: ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service
        .execute(dish)
        .pipe(
          tap((d) => {
            const dishes = this._state.dishesState.dishes.snapshot();
            const newDishs = dishes.map((di) => (di.id === d.id ? d : di));
            this._state.dishesState.dishes.set(newDishs);
            this._state.dishesState.currentDish.set(null);
            modal.toggle();
          })
        )
        .subscribe()
    );
  }

  selectDish(dishId: number): void {
    const currentDish = this._state.dishesState.dishes
      .snapshot()
      .find((d) => d.id === dishId);
    this._state.dishesState.currentDish.set(currentDish);
  }
  //#endregion
}
