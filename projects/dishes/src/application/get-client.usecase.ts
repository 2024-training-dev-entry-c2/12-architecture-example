import { inject, Injectable } from '@angular/core';
import { GetMenuService } from '../infrastructure/services/get/get-menu.service';
import { IDish, State } from '../public-api';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GetDishUsecase {
  private readonly _service = inject(GetMenuService);
  private readonly _state = inject(State);
  //#region Public Methods

  execute(id: number): Observable<IDish> {
    return this._service.getDishId(id).pipe(
      tap((dish: any) => {
        this._state.dishes_list.dish.set(dish);
      })
    );
  }
  //#endregion
}
