import { inject, Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { IDish } from '../domain/model/dish.model';
import { CreateDishService } from '../infrastructure/services/create-dish.service';
import { State } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class CreateDishUseCase {
  private readonly _service = inject(CreateDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //   #region Public methods
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
          tap((c) => {
            const dishs = this._state.dishesState.dishes.snapshot();
            this._state.dishesState.dishes.set([...dishs, c]);
            modal.toggle();
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
