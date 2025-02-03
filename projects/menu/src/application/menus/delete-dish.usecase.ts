import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { DeleteDishService } from "../../infrastructure/services/delete-dish.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteDishUseCase {
  private readonly _service = inject(DeleteDishService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  deleteDish(menuId: number, dishId: number): void {
      this._service.deleteDish(menuId, dishId) 
        .pipe(
          tap(() => {
            console.log('Dish deleted');
            const dishes = this._state.menus.dish.snapshot(); 
            const index = dishes.findIndex(dish => dish.idDish === dishId);
            if (index !== -1) {
              dishes.splice(index, 1);  
              this._state.menus.dish.set([...dishes]);  
            }
          })
        )
        .subscribe();
  }
}
