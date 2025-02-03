import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { DeleteMenuService } from "../infrastructure/services/delete-menu.service";
import { IMenu } from "../domain/model/menu.model";


@Injectable(
  {providedIn: 'root'}
)
export class DeleteMenuUseCase {
  private readonly _service = inject(DeleteMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;


  currentMenu$(): Observable<IMenu> {
    return this._state.menuState.currentMenu.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IMenu): void {
    this._state.menuState.currentMenu.set(menu);
    this.subscriptions.add(
      this._service.execute(menu.id)
        .pipe(
          tap(() => {
            const selectmenu = this._state.menuState.currentMenu.snapshot();
            const menus = this._state.menuState.menu.snapshot().filter(c => c.id !== selectmenu.id);
            this._state.menuState.menu.set(menus);
            this._state.menuState.currentMenu.set(null);
          }),
        ).subscribe()
    );
  }

}
