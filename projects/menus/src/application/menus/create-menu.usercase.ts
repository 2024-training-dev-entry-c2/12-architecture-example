import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menus.model";
import { CreateMenuService } from "../../infrastructure/services/create-menu.service";


@Injectable({
    providedIn: 'root'
})

export class CreateMenuUseCase{

    private readonly _service = inject(CreateMenuService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    menu$(): Observable<IMenu[]> {
      return this._state.menus.menu.$();
    }
  

    initSubscriptions(): void {
      this.subscriptions = new Subscription();
    }
  
    destroySubscriptions(): void {
      this.subscriptions.unsubscribe();
    }
  
    execute(menu: IMenu): void {
      this.subscriptions.add(
        this._service.createMenu(menu)
          .pipe(
            tap(result => {
                this._state.menus.menu.set([...this._state.menus.menu.snapshot(), result]);
            })
          )
          .subscribe()
      );
    }


}