import { inject, Injectable } from "@angular/core";
import { CreateMenusService } from "../../infrastructure/services/create-menus.service";
import { State } from "../../domain/state";
import { Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menus.model";
import { ModalComponent } from "shared";

@Injectable({
    providedIn: 'root'
})
export class CreateMenusUseCase {
    private readonly _service = inject(CreateMenusService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(menu: IMenu, modal: ModalComponent): void {
        this.subscriptions.add(
            this._service.createMenu(menu).
            pipe(
                tap((menu) => {
                    const menus = this._state.menus.menu.snapshot();
                    this._state.menus.menu.set([...menus, menu]);
                    modal.toggle();
                }),
            ).subscribe()
        );
    }
}