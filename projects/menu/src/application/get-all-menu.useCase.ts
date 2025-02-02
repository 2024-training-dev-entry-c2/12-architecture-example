import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../domain/model/menu.model";
import { State } from "../domain/state";
import { GetAllMenuService } from "../infrastructure/services/get-all-menu.service";

@Injectable({
  providedIn: 'root'
})
export class GetAllMenuUseCase {
  private readonly _service = inject(GetAllMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  menus$(): Observable<IMenu[]> {
    return this._state.menus.menu.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.getAll()
        .pipe(
          tap(menus => {
            console.log(menus);
            this._state.menus.menu.set(menus);
          })
        )
        .subscribe()
    );
  }
}
