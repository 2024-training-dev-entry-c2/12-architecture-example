import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IDish, IMenu } from "../domain/model/dish.model";
import { GetAllDishesService } from "../infrastructure/service/get-all-dish.service";

@Injectable({
  providedIn: 'root'
})
export class GetAllDishesUsecase {
  private readonly _service = inject(GetAllDishesService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  dishes$(): Observable<IDish[]> {
    return this._state.dishes.allDishes.$();
  }

  menus$(): Observable<IMenu[]> {
    return this._state.dishes.allMenus.$();
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
          tap(result => {
            this._state.dishes.allDishes.set(result);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}