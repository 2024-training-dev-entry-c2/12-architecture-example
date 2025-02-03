import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { GetAllMenusService } from "../infrastructure/services/get-all-menus.service";
import { IMenu } from "../domain/model/menu.model";

@Injectable({
    providedIn: 'root'
})
export class GetAllMenusUseCase {
    private readonly _service = inject(GetAllMenusService);
    private readonly _state = inject(State);
    private subscriptions: Subscription

    //#region Observables
    menu$(): Observable<IMenu[]> {
        return this._state.menu.showMenus.$() as Observable<IMenu[]>;
    }
    //#endregion

    //#region Public Methods
    initSubscriptions() {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions() {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
        this.subscriptions.add(
            this._service.execute()
                .pipe(
                    tap(this._state.menu.showMenus.set)
                )
                .subscribe()
            )
    }
    //#endregion

}