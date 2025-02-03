import { Observable, Subscription, tap } from 'rxjs';
import { RemoveMenuService } from '../infrastructure/services/remove/remove-menu.service';
import { IDish, State } from '../public-api';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class RemoveDishUsecase {
  private readonly _service = inject(RemoveMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

   $dishes$(): Observable<IDish> {
    return this._state.dishes_list.dish.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  //#region Public Methods
  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .deleteDish(id)
        .pipe(
          tap(() => {
            const dishes = this._state.dishes_list.dishes.snapshot();
            const updatedDishes = dishes.filter((dish) => dish.id !== id);
            this._state.dishes_list.dishes.set(updatedDishes);
          })
        )
        .subscribe()
    );
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  //#endregion
}
