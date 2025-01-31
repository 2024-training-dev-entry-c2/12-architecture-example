import { inject, Injectable } from "@angular/core";
import { CreateDishService } from "../../infrastructure/services/create-dish.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IDishes } from "../../public-api";


@Injectable({
    providedIn: 'root'
})

export class CreateDishUseCase{

    private readonly _service = inject(CreateDishService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    dish$(): Observable<IDishes[]> {
      return this._state.dishes.dish.$();
    }
  

    initSubscriptions(): void {
      this.subscriptions = new Subscription();
    }
  
    destroySubscriptions(): void {
      this.subscriptions.unsubscribe();
    }
  
    execute(dish: IDishes): void {
      this.subscriptions.add(
        this._service.createDish(dish)
          .pipe(
            tap(result => {
                this._state.dishes.dish.set([...this._state.dishes.dish.snapshot(), result]);
            })
          )
          .subscribe()
      );
    }


}