import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { IDish } from "../../domain/model/dishes.model";
import { CreateDishService } from "../../infrastructure/services/create-dish.service";

@Injectable({
  providedIn: 'root'
})
export class CreateDishUseCase {
  private readonly _service = inject(CreateDishService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  addDishToMenu(idMenu: number, dish: IDish): void {
    if (!idMenu) {
      console.error('El idMenu no es válido');
      return;
    }

    this.subscriptions.add(
      this._service.createDish(idMenu, dish)
        .pipe(
          tap(result => {
            console.log('Dish added to menu:', result);
            const dishes = this._state.dishes.dish.snapshot();
            this._state.dishes.dish.set([...dishes, result]);
          })
        ).subscribe()
    );
  }
}
