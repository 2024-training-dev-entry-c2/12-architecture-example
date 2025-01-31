import { inject, Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { State } from "../domain/state";

@Injectable({
  providedIn: 'root'
})
export class ModalUsecase {
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  open$(): Observable<boolean> {
    return this._state.menus.open.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(event: boolean) {
    this.subscriptions.add(
      this._state.menus.open.set(event)
    );
  }
  //#endregion
}