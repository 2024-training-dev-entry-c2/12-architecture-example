import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ListMenusService } from '../../infrastructure/services/list-menus.service';
import { IMenuResponse } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class ListMenusUsecase {
  private readonly _listMenusService = inject(ListMenusService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  menuResponse$(): Observable<IMenuResponse[]> {
    return this._state.menus.menuResponse.$();
  }
  snapshotMenuResponse(): IMenuResponse[] {
    return this._state.menus.menuResponse.snapshot();
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
        .pipe(tap((menus) => this._state.menus.menuResponse.set(menus)))
        .subscribe()
    );
  }
}
