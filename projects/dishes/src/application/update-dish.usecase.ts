import { inject, Injectable } from "@angular/core";
import { UpdateMenuService } from "../infrastructure/services/update/update-menu.service";

import { Subscription, tap } from "rxjs";
import { IDishRequest, State } from "../public-api";



@Injectable({
  providedIn: 'root'
})
export class UpdateDishUsecase {
private readonly _service = inject(UpdateMenuService);
private readonly _state = inject(State);
private subscriptions: Subscription = new Subscription();
execute(dish: IDishRequest, id: number): void {
  this.subscriptions.add(
    this._service.updateDish(dish, id)
      .pipe(
        tap(result => {
          const dishes = this._state.dishes_list.dishes.snapshot();
          const updatedDishes = dishes.map((dish) =>
            dish.id === id ? result : dish
          );
          this._state.dishes_list.dishes.set(updatedDishes);
        })
      )
      .subscribe()
  );
}

destroySubscriptions(): void {
  this.subscriptions.unsubscribe();
}
}       