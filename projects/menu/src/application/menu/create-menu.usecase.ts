import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe, IResponse } from "shared";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { CreateService } from "../../infrastructure/services/menu/create.service";

@Injectable({
  providedIn: 'root'
})
export class CreateMenuUsecase {
  private readonly _service = inject(CreateService);
  private readonly _state = inject(State);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.menus.message.$();
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
      this._service.execute(menu).pipe(
        map(result => this.formatMenuDetails(result)),
        tap(result => this.updateMenuState(result)),
        delay(2000),
        finalize(() => this.resetMenuState())
      ).subscribe()
    );
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
    this._state.menus.listMenus.set([...currentMenus, result.details]);
  }

  private resetMenuState(): void {
    this._state.menus.currentMenu.set(null);
    this._state.menus.open.set(false);
    this._state.menus.message.set(null);
  }
  //#endregion
}