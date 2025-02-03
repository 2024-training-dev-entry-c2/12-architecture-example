import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { IDish } from "../../domain/model/dishes.model";
import { UpdateDishService } from "../../infrastructure/services/update-dish.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateDishUseCase {
  private readonly _service = inject(UpdateDishService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  updateDishInMenu(idMenu: number, idDish: number, dishUpdated: IDish): void {
    this.subscriptions.add(
      this._service.updateDish(idMenu, idDish, dishUpdated)
        .pipe(
          tap(result => {
            console.log('Dish updated:', result);
            const dishes = this._state.dishes.dish.snapshot();
            const index = dishes.findIndex(dish => dish.idDish === idDish);
            if (index !== -1) {
              dishes[index] = result;
              this._state.dishes.dish.set([...dishes]);
            }
          })
        ).subscribe()
    );
  }
}
