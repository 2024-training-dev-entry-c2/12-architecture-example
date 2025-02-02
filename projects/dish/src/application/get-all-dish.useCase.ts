import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IDish } from "../domain/model/dish.model";
import { State } from "../domain/state";
import { GetAllDishService } from "../infrastructure/services/get-all-dish.service";

@Injectable({
  providedIn: 'root'
})
export class GetAllDishUseCase {
  private readonly _service = inject(GetAllDishService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;


  dishes$(): Observable<IDish[]> {
    return this._state.dishes.dish.$();
  }


  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }


  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.getAll()
        .pipe(
          tap(dishes => {
            console.log(dishes);
            this._state.dishes.dish.set(dishes);
          })
        )
        .subscribe()
    );
  }
}
