import { inject, Injectable } from "@angular/core";
import { map, Observable, Subscription } from "rxjs";
import { IMenu } from "../../domain/model/menu.model";
import { State } from "../../domain/state";
import { GetAllService } from "../../infrastructure/services/menu/get-all.service";

@Injectable({
  providedIn: 'root'
})
export class GetMenusUsecase {
  private readonly _service = inject(GetAllService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  menus$(): Observable<IMenu[]> {
    return this._state.dishes.listMenus.$();
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
          map(result => this._state.dishes.listMenus.set(result))
        )
        .subscribe()
    );
  }
  //#endregion
}