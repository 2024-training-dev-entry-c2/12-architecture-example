import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { UpdateDishService } from "../../infrastructure/services/update-dish.service";
import { IDish } from "../../domain/model/menus.model";

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

  updateDish(menuId: number, dishId: number, dish: IDish): void {
    this.subscriptions.add(
      this._service.updateDish(menuId, dishId, dish)  
        .pipe(
          tap(result => {
            console.log('Dish updated:', result);
            const dishes = this._state.menus.dish.snapshot(); 
            const index = dishes.findIndex(dish => dish.idDish === dishId);
            if (index !== -1) {
              dishes[index] = result; 
              this._state.menus.dish.set([...dishes]);  
            }
          })
        )
        .subscribe()
    );
  }
}
