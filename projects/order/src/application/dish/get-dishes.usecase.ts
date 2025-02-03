import { inject, Injectable } from "@angular/core";
import { map, Observable, Subscription } from "rxjs";
import { IDish } from "../../domain/model/dish.model";
import { State } from "../../domain/state";
import { GetAllService } from "../../infrastructure/services/dish/get-all.service";

@Injectable({
  providedIn: 'root'
})
export class GetDishesUsecase {
  private readonly _service = inject(GetAllService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  dishes$(): Observable<IDish[]> {
    return this._state.orders.listDishes.$();
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
          map(result => this._state.orders.listDishes.set(result))
        )
        .subscribe()
    );
  }
  //#endregion
}