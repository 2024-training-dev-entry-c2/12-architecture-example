import { inject, Injectable } from '@angular/core';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { ModalComponent } from 'shared';
import { State } from '../domain/state';
import { DeleteMenuService } from '../infrastructure/services/delete-menu.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuUseCase {
  private readonly _service = inject(DeleteMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public methods

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menuId: number, modal: ModalComponent): Observable<void> {
    return this._service.execute(menuId).pipe(
      tap(() => {
        modal.toggle();
        const menus = this._state.menuState.menus.snapshot();
        const newMenus = menus.filter((cust) => cust.menuId !== menuId);
        this._state.menuState.menus.set(newMenus);

        const currentMenu = this._state.menuState.currentMenu.snapshot();
        if (currentMenu?.menuId === menuId) {
          this._state.menuState.currentMenu.set(null);
        }
      }),
      catchError((error: Error) => {
        return throwError(() => error);
      })
    );
  }
  //#endregion
}
