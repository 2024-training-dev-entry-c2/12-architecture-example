import { inject, Injectable } from "@angular/core";
import { GetMenusService } from "../infrastructure/services/get-menus.service";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../domain/model/menu.model";

@Injectable({
    providedIn: 'root'
})
export class GetMenusUsecase {
    private readonly _service = inject(GetMenusService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    menus$(): Observable<IMenu[]> {
        return this._state.dishes.menus.$();
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
                    tap(result => this._state.dishes.menus.set(result))
                )
                .subscribe()
        )
    }
    //#endregion

}