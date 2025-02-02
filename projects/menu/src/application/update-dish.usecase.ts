import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { UpdateDishService } from '../infrastructure/services/update/update-dish.service';
import { State } from '../domain/state';
import { IDish } from '../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishUseCase {
  private readonly _service = inject(UpdateDishService);
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
  execute(dish: IDish, modal: ModalComponent): void {
    this.subscriptions.add(
      this._service
        .updateDish(dish)
        .pipe(
          tap((dish) => {
            const dishes = this._state.menu.dishes.snapshot();
            const newDish = dishes.map((d) => (d.id === dish.id ? dish : d));
            this._state.menu.dishes.set(newDish);
            this._state.menu.successMessage.set(
              '¡Plato actualizado con éxito!'
            );

            setTimeout(() => {
              modal.toggle();
              this._state.menu.currentDish$.set(null);
              this._state.menu.successMessage.set('');
            }, 1000);
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
