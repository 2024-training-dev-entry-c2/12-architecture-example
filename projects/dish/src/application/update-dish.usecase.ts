import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { ModalComponent } from "shared";
import { UpdateDishService } from "../infrastructure/service/update-dish.service";
import { IDish } from "../domain/model/dish.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateDishUsecase {
  private readonly _service = inject(UpdateDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  currentDish$(): Observable<IDish> {
    return this._state.dishes.currentDish.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dish: IDish, modal: ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.execute(dish).pipe(
        tap((updatedDish) => {
          const dishes = this._state.dishes.allDishes.snapshot();
          const selectedMenu = this._state.dishes.allMenus.snapshot().find(menu => menu.id === updatedDish.menu.id);
          if (selectedMenu) {
            updatedDish.menu = selectedMenu;
          }
          const updatedDishes = dishes.map(d => 
            d.id === updatedDish.id ? { ...d, ...updatedDish } : d
          );
          this._state.dishes.allDishes.set(updatedDishes);
          modal.toggle();
        }),
      ).subscribe()
    );
  }

  selectDish(id: number): void {
    const currentDish = this._state.dishes.allDishes.snapshot().find(dish => dish.id === id);
    if(currentDish) {
      this._state.dishes.currentDish.set(currentDish);
    } else {
      this._state.dishes.currentDish.set(null);
    }
  }
  //#endregion

  //#region Private Methods
  //#endregion
}