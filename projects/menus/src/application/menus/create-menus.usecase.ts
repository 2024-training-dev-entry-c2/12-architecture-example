import { inject, Injectable } from "@angular/core";
import {  CreateMenuService } from "../../infrastructure/services/create-menu.service";
import { State } from "../../domain/state";
import {  IMenu } from "../../domain/model/menu.model";
import { Observable, Subscription, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateUserUsecase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  user$(): Observable<IMenu> {
    return this._state.menus.menu.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IMenu): void {
    this.subscriptions.add(
      this._service.create(menu)
        .pipe(
          tap(result => {
            this._state.menus.menu.set(result);

            // const menu = this._state.menu.user.snapshot();
            // this._state.menu.user.set([...menu, result])
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}