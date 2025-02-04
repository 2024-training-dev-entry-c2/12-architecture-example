import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Observable, Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalUseCase {
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    openModal$(): Observable<boolean> {
        return this._state.orders.open.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions() {
        this.subscriptions = new Subscription();
    }
    destroySubscriptions() {
        this.subscriptions.unsubscribe();
    }

    execute(event: boolean) {
        this.subscriptions.add(
            this._state.orders.open.set(event)
        )
    }
    //#endregion

}