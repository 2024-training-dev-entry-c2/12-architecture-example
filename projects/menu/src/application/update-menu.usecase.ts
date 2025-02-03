import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { UpdateMenuService } from "../infrastructure/services/update-menu.service";
import { IMenu } from "../domain/model/menu.model";

@Injectable({
    providedIn: 'root'
})
export class UpdateMenuUseCase {
    private readonly _service = inject(UpdateMenuService);
    private readonly _state = inject(State);
    private subscription: Subscription;

    //#region Observables
    message$(): Observable<string> {
        return this._state.menu.message.$();
    }

    currentMenu$(): Observable<IMenu> {
        return this._state.menu.currentMenu.$()
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscription = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscription.unsubscribe();
    }

    execute(menu: IMenu) {
        this.subscription.add(
            this._service.execute(menu.id, menu)
                .pipe(
                    tap(result => {
                        this._state.menu.message.set('Menú actualizado con éxito');
                        const currentMenus = this._state.menu.showMenus.snapshot();
                        const updatedMenus = currentMenus.map(m => m.id === result.id ? result : m);
                        this._state.menu.showMenus.set(updatedMenus);
                    }),
                    delay(2000),
                    finalize(() => {
                        this._state.menu.currentMenu.set(null);
                        this._state.menu.open.set(false);
                        this._state.menu.message.set('');
                    })
                ).subscribe()
        )
    }

    selectMenu(menuId: number) {
        const currentMenu = this._state.menu.showMenus.snapshot().find(m => m.id === menuId);
        this._state.menu.currentMenu.set(currentMenu);
    }
    //#endregion
}