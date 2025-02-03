import { inject, Injectable } from "@angular/core";
import { CreateMenuService } from "../../infrastructure/services/create-menu.service";
import { State } from "../../domain/state";
import { IMenu } from "../../domain/model/menus.model";
import { Observable, Subscription, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CreateMenuUseCase {
    private readonly _service = inject(CreateMenuService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    menu$(): Observable<IMenu[]> {
        return this._state.menus.menu.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    addMenu(menu: IMenu): void {
        this.subscriptions.add(
            this._service.createMenu(menu)
                .pipe(
                    tap(result => {
                        const menus = this._state.menus.menu.snapshot();
                        this._state.menus.menu.set([...menus, result]);
                    })
                ).subscribe()
        );
    }
    //#endregion

    //#region Private Methods
    //#endregion
}