import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IMenu } from "../domain/model/menu.model";
import { DeleteMenuService } from "../infrastructure/service/delete-menu.service";
import { GetAllMenusUsecase } from "./get-all-menu.usecase";


@Injectable({
  providedIn: 'root'
})
export class DeleteMenuUsecase {
  private readonly _service = inject(DeleteMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  menus$(): Observable<IMenu[]> {
    return this._state.menus.allMenus.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    if (!this.subscriptions || this.subscriptions.closed) {
      this.subscriptions = new Subscription();
    }
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.delete(id).pipe(
        tap(() => {
          console.log(`Cliente con ID ${id} eliminado`);
          const updatedMenus = this._state.menus.allMenus.snapshot().filter(client => client.id !== id);
          this._state.menus.allMenus.set(updatedMenus);
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}