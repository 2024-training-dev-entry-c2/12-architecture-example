import { inject, Injectable } from '@angular/core';
import { GetDishesService } from '../infrastructure/services/get-dishes.service';
import { StateIndesDish } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { Idish } from '../domain/model/dish.model';

@Injectable({ providedIn: 'root' })
export class GetDishesUseCase {
  private readonly _service = inject(GetDishesService);
  private readonly _state = inject(StateIndesDish);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  dishes$(): Observable<Idish[]> {
    return this._state.dishState.dishes.$();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(tap(this._state.dishState.dishes.changeState))
        .subscribe()
    );
  }
}
