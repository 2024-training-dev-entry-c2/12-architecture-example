import { inject, Injectable } from '@angular/core';
import { ListMenuService } from '../../infrastructure/services/list/list-menu.service';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class GetMenusListUseCase {
  private readonly _service = inject(ListMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();
  //#region Observables
  menus$(): Observable<IMenu[]> {
    return this._state.menus.menus.$();
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
      this._service
        .getMenus()
        .pipe(
          tap((menus: IMenu[]) => {
            this._state.menus.menus.set(menus);
          })
        )
        .subscribe(
          () => {
            console.log('Menus obtenidos');
          },
          (err) => {
            console.error('Error al obtener menús:', err);
          }
        )
    );
  }
  //#endregion
}
