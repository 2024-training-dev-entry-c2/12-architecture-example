import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { FindAllDishesService } from "../infrastructure/services/find-all-dishes.service";
import { State } from "../domain/state";

@Injectable({
  providedIn: 'root'
})
export class FindAllDishesUseCase{
  private readonly _service = inject(FindAllDishesService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  dishes$(){
    return this._state.dishesState.dishes.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(){
    this.subscriptions.add(
      this._service.execute()
      .pipe(
        tap(this._state.dishesState.dishes.set)
      )
      .subscribe()
    )
  }
}
