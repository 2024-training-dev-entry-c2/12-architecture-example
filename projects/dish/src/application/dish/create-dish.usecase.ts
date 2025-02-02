import { CurrencyPipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, mergeMap, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe, IResponse } from "shared";
import { IDish } from "../../domain/model/dish.model";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { CreateService } from "../../infrastructure/services/dish/create.service";
import { GetNamesUsecase } from "../menu/get-name.usecase";

@Injectable({
  providedIn: 'root'
})
export class CreateDishUsecase {
  private readonly _nameUseCase = inject(GetNamesUsecase);
  private readonly _service = inject(CreateService);
  private readonly _state = inject(State);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private currencyPipe = new CurrencyPipe('en');
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

  execute(dish: IDish): void {
    this.subscriptions.add(
      this._service.execute(dish).pipe(
        mergeMap(result => (
          this._nameUseCase.execute(result.details.id).pipe(
            map(menu => this.formatDishDetails(result, menu)),
            tap(result => this.updateDishState(result)),
          )
        )),
        delay(2000),
        finalize(() => this.resetDishState())
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  private formatDishDetails(result: IResponse, menu: IMenu): IResponse {
    return {
      message: result.message,
      details: {
        ...result.details,
        name: this.capitalizeFirstPipe.transform(result.details.name),
        description: this.capitalizeFirstPipe.transform(result.details.description),
        price: this.currencyPipe.transform(result.details.price, 'COP'),
        menuName: this.capitalizeFirstPipe.transform(menu.name),
        menuId: menu?.id,
      }
    };
  }

  private updateDishState(result: IResponse): void {
    this._state.dishes.message.set(result.message);
    const currentDishes = this._state.dishes.listDishes.snapshot();
    this._state.dishes.listDishes.set([...currentDishes, result.details]);
  }

  private resetDishState(): void {
    this._state.dishes.currentDish.set(null);
    this._state.dishes.open.set(false);
    this._state.dishes.message.set(null);
  }
  //#endregion
}