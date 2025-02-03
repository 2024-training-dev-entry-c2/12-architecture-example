import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IMenu } from "../domain/model/menu.model";
import { AddMenuService } from "../infrastructure/service/add-menu.service";
import { ModalComponent } from "shared";

@Injectable({
  providedIn: 'root'
})
export class AddMenuUsecase {
  private readonly _service = inject(AddMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  menus$(): Observable<IMenu[]> {
    return this._state.menus.allMenus.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: Partial<IMenu>, modal: ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.create(menu).pipe(
        tap((menu) => {
          console.log(`Se a creado el menu ${menu}`);
          const menus = this._state.menus.allMenus.snapshot();
          this._state.menus.allMenus.set([...menus, menu]);
          modal.toggle();
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}