import { inject, Injectable } from "@angular/core";
import { UpdateMenusService } from "../../infrastructure/services/update-menus.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menus.model";
import { ModalComponent } from "shared";

@Injectable({
    providedIn: 'root'
})
export class UpdateMenusUseCase {
    private readonly _service = inject(UpdateMenusService);
    private readonly _state = inject(State);
    private subscription: Subscription;

    currentMenu$(): Observable<IMenu> {
        return this._state.menus.currentMenu.$();
    }

    initSubscriptions(): void {
        this.subscription = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscription.unsubscribe();
    }

    execute(menu: IMenu, modal: ModalComponent): void {
        this.subscription.add(
            this._service.updateMenu(menu)
            .pipe(
                tap((updateMenu) => {
                    const menus = this._state.menus.menu.snapshot();
                    const newMenus = menus.map(m => m.id === updateMenu.id ? updateMenu : m);
                    this._state.menus.menu.set(newMenus);
                    modal.toggle();
                    this._state.menus.currentMenu.set(null);
                })
            ).subscribe()
        );
    }

    selectMenu(id: string): void {
        const currentMenu = this._state.menus.menu.snapshot().find(menu => menu.id === id);
        this._state.menus.currentMenu.set(currentMenu);
    }
}