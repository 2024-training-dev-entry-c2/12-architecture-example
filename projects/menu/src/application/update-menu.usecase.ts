import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap, catchError } from "rxjs";
import { UpdateMenuService } from "../infrastructure/service/update-menu.service";
import { IMenu } from "../domain/model/menu.model";
import { State } from "../domain/state";
import { ModalComponent } from "shared";

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuUseCase {
  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

  //#region Observables
  currentMenu$(): Observable<IMenu> {
    return this._state.menus.currentMenu.$();
  }

  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IMenu, modal: ModalComponent): void {
    this.subscriptions.add(
      this._service.execute(menu)
        .pipe(
          tap(() => {
            const menus = this._state.menus.allMenus.snapshot();
            const newMenu = menus.map(m => m.id === menu.id ? menu : m);
            this._state.menus.allMenus.set(newMenu);
            modal.toggle();
            this._state.menus.currentMenu.set(null);
          }),
        ).subscribe()
    );
  }
  

  selectMenu(id: number): void {
    const currentMenu = this._state.menus.allMenus.snapshot().find(menu => menu.id === id);
    if (currentMenu) {
      this._state.menus.currentMenu.set(currentMenu);
    } else {
      this._state.menus.currentMenu.set(null); 
    }
  }
}
