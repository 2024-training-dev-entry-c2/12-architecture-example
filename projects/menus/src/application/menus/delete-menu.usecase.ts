import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { DeleteMenuService } from "../../infrastructure/services/delete-menu.service";
import { IMenu } from "../../domain/model/menus.model";


@Injectable({
    providedIn: 'root'
})

export class DeleteMenuUseCase{
    private readonly _service = inject(DeleteMenuService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    menu$(): Observable<IMenu[]> {
        return this._state.menus.menu.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
      }

      
    execute(menu: IMenu): void {
        this.subscriptions.add(
            this._service.deleteMenu(menu)
                .pipe(
                    tap(() => {
                        const currentDishs = this._state.menus.menu.snapshot();
                        const filteredmenus = currentDishs.filter(d => d.id !== menu.id);
                        this._state.menus.menu.set(filteredmenus);
                    })
                )
                .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }


}