import { inject, Injectable } from '@angular/core';
import { StateIndesDish } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { DeleteDishService } from '../infrastructure/services/delete-dish.service';

@Injectable({ providedIn: 'root' })
export class DeleteDishUseCase {
  private readonly _service = inject(DeleteDishService);
  private readonly _state = inject(StateIndesDish);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap((dish) => {
            const dishes = this._state.dishState.dishes.valueState();
            this._state.dishState.dishes.changeState(
              dishes.filter((d) => d.id !== id)
            );
          })
        )
        .subscribe()
    );
  }
}
