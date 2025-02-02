import { CurrencyPipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, mergeMap, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe, IResponse } from "shared";
import { IDish } from "../../domain/model/dish.model";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { UpdateService } from "../../infrastructure/services/dish/update.service";
import { GetNamesUsecase } from "../menu/get-name.usecase";

@Injectable({
  providedIn: 'root'
})
export class UpdateDishUsecase {
  private readonly _nameUseCase = inject(GetNamesUsecase);
  private readonly _service = inject(UpdateService);
  private readonly _state = inject(State);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private currencyPipe = new CurrencyPipe('en');
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

  selectDish(dishId: number) {
    const currentDish = this._state.dishes.listDishes.snapshot().find(dish => dish.id === dishId);
    currentDish.price = currentDish.price.toString().replace('COP', '');
    currentDish.price = currentDish.price.toString().replace(',', '');
    currentDish.price = Number(currentDish.price);
    this._state.dishes.currentDish.set(currentDish);
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
    const updatedDishes = currentDishes.map(current => current.id === result.details.id ? result.details : current);
    this._state.dishes.listDishes.set(updatedDishes);
  }

  private resetDishState(): void {
    this._state.dishes.currentDish.set(null);
    this._state.dishes.open.set(false);
    this._state.dishes.message.set(null);
  }
  //#endregion
}