import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe } from "shared";
import { IDish } from "../../domain/model/dish.model";
import { State } from "../../domain/state";
import { CreateService } from "../../infrastructure/services/dish/create.service";
import { CurrencyPipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CreateDishUsecase {
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private currencyPipe = new CurrencyPipe('en');
  private readonly _service = inject(CreateService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.dishes.message.$();
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
      this._service.execute(dish).pipe(
        map(result => ({
          ...result,
          details: {
            ...result.details,
            name: this.capitalizeFirstPipe.transform(result.details.name),
            description: this.capitalizeFirstPipe.transform(result.details.description),
            price: this.currencyPipe.transform(result.details.price, 'COP'),
          }
        })),
        tap(result => {
          this._state.dishes.message.set(result.message);
          const currentDishes = this._state.dishes.listDishes.snapshot();
          this._state.dishes.listDishes.set([...currentDishes, result.details]);
        }),
        delay(2000),
        finalize(() => {
          this._state.dishes.message.set(null);
          this._state.dishes.open.set(false);
          this._state.dishes.message.set(null);
        })
      ).subscribe()
    );
  }
  //#endregion
}