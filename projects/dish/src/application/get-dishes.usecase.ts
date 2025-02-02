import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { State } from '../domain/state';
import { GetDishesService } from '../infrastructure/services/get-dishes.service';
import { IDish } from '../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class GetDishesUseCase {
  private readonly _service = inject(GetDishesService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  //#region observables
  dishes$(): Observable<IDish[]> {
    return this._state.dishesState.dishes.$();
  }
  //#endregion

  //#region public methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((c) => {
            this._state.dishesState.dishes.set(c);
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
