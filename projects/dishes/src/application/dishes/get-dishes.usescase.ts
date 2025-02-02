import { inject, Injectable, OnDestroy } from '@angular/core';
import { GetDishesService } from '../../infrastructure/services/get-dishes.service';
import { State } from '../../domain/state';
import { Observable, Subscription } from 'rxjs';
import { IDishes } from '../../domain/model/dishes.model';

@Injectable({
  providedIn: 'root',
})

export class GetDishUseCase {
  private readonly _service = inject(GetDishesService);
  private readonly _state = inject(State);
 private subscriptions = new Subscription();

  dish$(): Observable<IDishes[]> {
    return this._state.dishes.dish.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  

  getDishesSnapshot(): IDishes[] {
    return this._state.dishes.dish.snapshot();
  }

  execute(): void {
    if (this.getDishesSnapshot()?.length) {
      return;
    }

    this._service
      .getDishes()
      .subscribe({
        next: (dishes) => {
          this._state.dishes.dish.set(dishes);
        },
        error: (error) => {
          console.error('Error fetching dishes:', error);
        },
      });
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
}
}
