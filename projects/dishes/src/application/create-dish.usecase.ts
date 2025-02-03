import { inject, Injectable } from "@angular/core";
import { CreateMenuService } from "../infrastructure/services/create/create-menu.service";
import { IDish, IDishRequest, State } from "../public-api";
import { Observable, Subscription, tap } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class CreateDishUsecase {
private readonly _service = inject(CreateMenuService);
private readonly _state = inject(State);
private subscriptions: Subscription;

  //#region Observables
  dish$(): Observable<IDish> {
    return this._state.dishes_list.dish.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dish: IDishRequest): void {
    this.subscriptions.add(
      this._service.addDish(dish)
        .pipe(
          tap(result => {
            const dishes = this._state.dishes_list.dishes.snapshot();
            this._state.dishes_list.dishes.set([...dishes, result])
 
            // const dishes = this._state.dishes_list.dishes.snapshot();
            // this._state.dishes_list.dishes.set([...dishes, result])
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods 
}   