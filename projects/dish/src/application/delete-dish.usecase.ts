import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IDish } from "../domain/model/dish.model";
import { DeleteDishService } from "../infrastructure/service/delete-dish.service";


@Injectable({
  providedIn: 'root'
})
export class DeleteDishUsecase {
  private readonly _service = inject(DeleteDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  dishes$(): Observable<IDish[]> {
    return this._state.dishes.allDishes.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    if (!this.subscriptions || this.subscriptions.closed) {
      this.subscriptions = new Subscription();
    }
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.delete(id).pipe(
        tap(() => {
          console.log(`Plato con ID ${id} eliminado`);
          const updatedDishes = this._state.dishes.allDishes.snapshot().filter(client => client.id !== id);
          this._state.dishes.allDishes.set(updatedDishes);
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}