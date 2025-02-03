import { inject, Injectable } from "@angular/core";
import { CreateDishService } from "../infrastructure/services/create-dish.service";
import { State } from "../domain/state";
import { delay, finalize, Observable, Subscription, tap } from "rxjs";
import { IDish } from "../domain/model/dish.model";

@Injectable({
    providedIn: 'root'
})
export class CreateDishUseCase {
    private readonly _service = inject(CreateDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

      //#region Public Methods
      message$(): Observable<string> {
        return this._state.dishes.message.$();
      }
    
      initSubscriptions(): void {
        this.subscriptions = new Subscription();
      }
    
      destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
      }
    
      execute(dish: IDish) {
        this.subscriptions.add(
          this._service.execute(dish).pipe(
            tap(result => {
              this._state.dishes.message.set('Menu creado con éxito');
              const currentDish = this._state.dishes.showDishes.snapshot();
              this._state.dishes.showDishes.set([...currentDish, result]);
            }),
            delay(2000),
            finalize(() => {
              this._state.dishes.open.set(false);
              this._state.dishes.message.set('');
            })
          ).subscribe()
        );
      }
      //#endregion
}