import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { ICreateMenu } from "../domain/model/create.menu.model";
import { IMenu } from "../domain/model/menu.model";
import { UpdateMenuService } from "../infrastructure/services/update-menu.service";


@Injectable(
  {providedIn: 'root'}
)
export class UpdateMenuUseCase {

  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;



  currentMenu$(): Observable<IMenu> {
    return this._state.menuState.currentMenu.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number, body: ICreateMenu): void {
    this.subscriptions.add(
      this._service.execute(id, body)
        .pipe(
          tap(() => {
            const menu = this._state.menuState.currentMenu.snapshot();
            const menus = this._state.menuState.menu.snapshot();
            this._state.menuState.menu.set(menus.filter(m => m.id !== menu.id));
            this._state.menuState.currentMenu.set(null);

          }),
        ).subscribe()
    );
  }

}
