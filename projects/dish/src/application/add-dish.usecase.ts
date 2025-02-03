import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IDish } from "../domain/model/dish.model";
import { ModalComponent } from "shared";
import { AddDishService } from "../infrastructure/service/add-dish.service";

@Injectable({
  providedIn: 'root'
})
export class AddDishUsecase {
  private readonly _service = inject(AddDishService);
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

  execute(dish: Partial<IDish>, modal:ModalComponent): void {
    this.subscriptions.add(
      this._service.create(dish).pipe(
        tap((result) => {
            console.log(`Plato ${dish} creado`);
            const dishes = this._state.dishes.allDishes.snapshot();
            this._state.dishes.allDishes.set([...dishes, result]);
            modal.toggle();
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}