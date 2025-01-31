import { inject, Injectable } from '@angular/core';
import { GetMenuService } from '../infrastructure/services/get/get-menu.service';
import { IDish, State } from '../public-api';
import { Observable, Subscription, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GetDishUsecase {
  private readonly _service = inject(GetMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  dish$(): Observable<IDish> {
    return this._state.dishes_list.dish.$();
  }
  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): Observable<IDish> {
    return this._service.getDishId(id).pipe(
      tap((dish: any) => {
        this._state.dishes_list.dish.set(dish);
      })
    );
  }
  //#endregion
}
