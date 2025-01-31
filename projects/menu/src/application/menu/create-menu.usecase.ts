import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { CreateService } from "../../infrastructure/services/menu/create.service";
import { CapitalizeFirstPipe } from "shared";

@Injectable({
  providedIn: 'root'
})
export class CreateMenuUsecase {
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private readonly _service = inject(CreateService);
  private readonly _state = inject(State);
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

  execute(menu: IMenu) {
    this.subscriptions.add(
      this._service.execute(menu).pipe(
        map(result => ({
          ...result,
          details: {
            ...result.details,
            name: this.capitalizeFirstPipe.transform(result.details.name),
            description: this.capitalizeFirstPipe.transform(result.details.description),
          }
        })),
        tap(result => {
          this._state.menus.message.set(result.message);
          const currentMenus = this._state.menus.listMenus.snapshot();
          this._state.menus.listMenus.set([...currentMenus, result.details]);
        }),
        delay(2000),
        finalize(() => {
          this._state.menus.message.set(null);
          this._state.menus.open.set(false);
          this._state.menus.message.set(null);
        })
      ).subscribe()
    );
  }
  //#endregion
}