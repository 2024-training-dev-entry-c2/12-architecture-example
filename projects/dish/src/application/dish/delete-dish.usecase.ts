import { inject, Injectable } from "@angular/core";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { DeleteService } from "../../infrastructure/services/dish/delete.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteDishUsecase {
  private readonly _service = inject(DeleteService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.dishes.message.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dishId: number) {
    this._service.execute(dishId).pipe(
      tap(result => {
        this._state.dishes.message.set(result.message);
        const currentDishes = this._state.dishes.listDishes.snapshot();
        this._state.dishes.listDishes.set(currentDishes.filter(dish => dish.id !== dishId));
      }),
      finalize(() => this._state.dishes.message.set(null))
    ).subscribe();
  }
  //#endregion
}