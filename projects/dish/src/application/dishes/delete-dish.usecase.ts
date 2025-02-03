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

  deleteDishFromMenu(idMenu: number, idDish: number): void {
    this.subscriptions.add(
      this._service.deleteDish(idMenu, idDish)
        .pipe(
          tap(() => {
            console.log('Dish deleted from menu');
            const dishes = this._state.dishes.dish.snapshot();
            const index = dishes.findIndex(dish => dish.idDish === idDish);
            if (index !== -1) {
              dishes.splice(index, 1);
              this._state.dishes.dish.set([...dishes]);
            }
          })
        ).subscribe()
    );
  }
}
