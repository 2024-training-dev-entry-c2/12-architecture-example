import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { FindAllMenusService } from "../infrastructure/services/find-all-menus.service";

@Injectable({
  providedIn: 'root'
})
export class FindAllMenusUseCase{
  private readonly _service = inject(FindAllMenusService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  menus$(){
    return this._state.menuState.menu.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(){
    this.subscriptions.add(
      this._service.execute()
      .pipe(
        tap(this._state.menuState.menu.set)
      )
      .subscribe()
    )
  }
}
