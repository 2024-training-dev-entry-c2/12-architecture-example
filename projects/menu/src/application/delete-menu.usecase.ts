import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Subscription, tap } from "rxjs";
import { DeleteMenuService } from "../infrastructure/services/delete-menu.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteMenuUseCase {
    private readonly _service = inject(DeleteMenuService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(menuId: number) {
        this.subscriptions.add(
            this._service.execute(menuId).pipe(
                tap(result => {
                    const currentMenus = this._state.menu.showMenus.snapshot();
                    this._state.menu.showMenus.set(currentMenus.filter(c => c.id !== menuId));
                })
            ).subscribe()
        );
    }
    //#endregion
}