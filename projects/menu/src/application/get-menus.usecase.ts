import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenu } from '../domain/models/menu.model';
import { State } from '../domain/state';
import { GetMenusService } from '../infrastructure/services/get-menu.service';

@Injectable({
  providedIn: 'root',
})
export class GetMenusUseCase {
  private readonly _service = inject(GetMenusService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region observables
  menus$(): Observable<IMenu[]> {
    return this._state.menuState.menus.$();
  }
  //#endregion

  //#region public methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((c) => {
            this._state.menuState.menus.set(c);
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
