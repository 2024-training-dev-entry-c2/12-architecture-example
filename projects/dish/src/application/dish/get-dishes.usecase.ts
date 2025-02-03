import { CurrencyPipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { forkJoin, map, mergeMap, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe } from "shared";
import { IDish } from "../../domain/model/dish.model";
import { State } from "../../domain/state";
import { GetAllService } from "../../infrastructure/services/dish/get-all.service";
import { GetNamesUsecase } from "../menu/get-name.usecase";

@Injectable({
  providedIn: 'root'
})

export class GetDishesUsecase {
  private readonly _useCaseName = inject(GetNamesUsecase);
  private readonly _service = inject(GetAllService);
  private readonly _state = inject(State);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private currencyPipe = new CurrencyPipe('en');
  private subscriptions: Subscription;

  //#region Observables
  dishes$(): Observable<IDish[]> {
    return this._state.dishes.listDishes.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.execute()
        .pipe(
          map(result => result.map(dish => this._useCaseName.execute(dish.id).pipe(
            map(menu => ({ 
              ...dish, 
              name: this.capitalizeFirstPipe.transform(dish.name),
              description: this.capitalizeFirstPipe.transform(dish.description),
              menuName: this.capitalizeFirstPipe.transform(menu.name),
              menuId: menu?.id, 
              price: this.currencyPipe.transform(dish.price, 'COP'),
             }))
          ))),
          mergeMap(result => forkJoin(result)),
          tap(result => this._state.dishes.listDishes.set(result))
        )
        .subscribe()
    );
  }
  //#endregion
}