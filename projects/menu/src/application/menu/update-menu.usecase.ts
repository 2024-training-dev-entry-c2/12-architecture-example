import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe, IResponse } from "shared";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { UpdateService } from "../../infrastructure/services/menu/update.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuUsecase {
  private readonly _service = inject(UpdateService);
  private readonly _state = inject(State);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.menus.message.$();
  }

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

  execute(menu: IMenu): void {
    this.subscriptions.add(
      this._service.execute(menu.id, menu).pipe(
        map(result => this.formatMenuDetails(result)),
        tap(result => this.updateMenuState(result)),
        delay(2000),
        finalize(() => this.resetMenuState())
      ).subscribe()
    );
  }

  selectMenu(menuId: number): void {
    const currentMenu = this._state.menus.listMenus.snapshot().find(menu => menu.id === menuId);
    this._state.menus.currentMenu.set(currentMenu);
  }
  //#endregion

  //#region Private Methods
  private formatMenuDetails(result: IResponse): IResponse {
    return {
      ...result,
      details: {
        ...result.details,
        name: this.capitalizeFirstPipe.transform(result.details.name),
        description: this.capitalizeFirstPipe.transform(result.details.description),
      }
    };
  }

  private updateMenuState(result: IResponse): void {
    this._state.menus.message.set(result.message);
    const currentMenus = this._state.menus.listMenus.snapshot();
    const updatedMenus = currentMenus.map(current => current.id === result.details.id ? result.details : current);
    this._state.menus.listMenus.set(updatedMenus);
  }

  private resetMenuState(): void {
    this._state.menus.currentMenu.set(null);
    this._state.menus.open.set(false);
    this._state.menus.message.set(null);
  }
  //#endregion
}