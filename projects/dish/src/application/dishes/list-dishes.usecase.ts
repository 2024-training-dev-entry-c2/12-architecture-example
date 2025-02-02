import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap, forkJoin, switchMap } from 'rxjs';
import { IDishResponse } from '../../domain/model/dish.model';
import { ListDishesService } from '../../infrastructure/services/list-dishes.service';
import { ListMenusService } from 'menu';
import { IMenuResponse } from 'menu';

@Injectable({
  providedIn: 'root',
})
export class ListDishesUsecase {
  private readonly _listDishesService = inject(ListDishesService);
  private readonly _listMenusService = inject(ListMenusService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  dishResponse$(): Observable<IDishResponse[][]> {
    return this._state.dishes.dishResponse.$();
  }

  snapshotDishResponse(): IDishResponse[][] {
    return this._state.dishes.dishResponse.snapshot();
  }

  menuResponse$(): Observable<IMenuResponse[]> {
    return this._state.dishes.menuResponse.$();
  }
  snapshotMenuResponse(): IMenuResponse[] {
    return this._state.dishes.menuResponse.snapshot();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._listMenusService
        .execute()
        .pipe(
          switchMap((menus) => {
            this._state.dishes.menuResponse.set(menus);
            const dishRequests = menus.map((menu) =>
              this._listDishesService.execute(menu.id)
            );
            return forkJoin(dishRequests);
          }),
          tap((dishesArray) => this._state.dishes.dishResponse.set(dishesArray))
        )
        .subscribe()
    );
  }
}
