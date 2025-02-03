import { inject, Injectable } from "@angular/core";
import { tap, Subscription, Observable, switchMap, of } from "rxjs";
import { IMenu } from "../domain/model/menu.model";
import { State } from "../domain/state";
import { UpdateMenuService } from "../infrastructure/services/update-menu.service";

@Injectable({
    providedIn: 'root'
})
export class UpdateMenuUseCase {
    private readonly _service = inject(UpdateMenuService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number, updatedMenu: Partial<IMenu>): Observable<void> {
        return this._service.update(id, updatedMenu).pipe(
            tap(updatedMenu => {
                console.log(`Menú actualizado: ${updatedMenu}`);

                const currentMenus = this._state.menus.menu.snapshot();

                const updatedMenus = currentMenus.map(menu =>
                    menu.id === id ? { ...menu, ...updatedMenu } : menu
                );

                this._state.menus.menu.set(updatedMenus);
            }),
            switchMap(() => of(void 0)) 
        );
    }
}
