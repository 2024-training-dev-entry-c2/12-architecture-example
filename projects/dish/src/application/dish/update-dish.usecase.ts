import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe } from "shared";
import { IDish } from "../../domain/model/dish.model";
import { State } from "../../domain/state";
import { UpdateService } from "../../infrastructure/services/dish/update.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateDishUsecase {
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private readonly _service = inject(UpdateService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.dishes.message.$();
  }

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

  execute(dish: IDish) {
    this.subscriptions.add(
      this._service.execute(dish.id, dish).pipe(
        map(result => ({
          ...result,
          details: {
            ...result.details,
            name: this.capitalizeFirstPipe.transform(result.details.name),
            description: this.capitalizeFirstPipe.transform(result.details.description),
          }
        })),
        tap(result => {
          this._state.dishes.message.set(result.message);
          const currentDishes = this._state.dishes.listDishes.snapshot();
          const updatedDishes = currentDishes.map(current => current.id === result.details.id ? result.details : current);
          this._state.dishes.listDishes.set(updatedDishes);
        }),
        delay(2000),
        finalize(() => {
          this._state.dishes.currentDish.set(null);
          this._state.dishes.open.set(false);
          this._state.dishes.message.set(null);
        })
      ).subscribe()
    );
  }

  selectDish(dishId: number) {
    const currentDish = this._state.dishes.listDishes.snapshot().find(dish => dish.id === dishId);
    currentDish.price = currentDish.price.toString().replace('COP', '');
    currentDish.price = currentDish.price.toString().replace(',', '');
    currentDish.price = Number(currentDish.price);
    this._state.dishes.currentDish.set(currentDish);
  }
  //#endregion
}