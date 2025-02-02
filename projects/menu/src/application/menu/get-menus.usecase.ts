import { inject, Injectable } from "@angular/core";
import { map, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe } from "shared";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { GetAllService } from "../../infrastructure/services/menu/get-all.service";

@Injectable({
  providedIn: 'root'
})
export class GetMenusUsecase {
  private readonly _service = inject(GetAllService);
  private readonly _state = inject(State);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private subscriptions: Subscription;

  //#region Observables
  menus$(): Observable<IMenu[]> {
    return this._state.menus.listMenus.$() as Observable<IMenu[]>;
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
      this._service.execute()
        .pipe(
          map(result => result.map(menu => ({
            ...menu,
            name: this.capitalizeFirstPipe.transform(menu.name),
            description: this.capitalizeFirstPipe.transform(menu.description)
          }))),
          tap(result => this._state.menus.listMenus.set(result)),
        )
        .subscribe()
    );
  }
  //#endregion
}