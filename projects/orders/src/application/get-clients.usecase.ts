import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IClient } from "../domain/model/client.model";
import { GetClientsService } from "../infrastructure/services/get-clients.service";

@Injectable({
    providedIn: 'root'
})
export class GetClientsUseCase {
    private readonly _service = inject(GetClientsService);
    private readonly _state = inject(State);
    private subscriptions: Subscription

    //#region Observables
    client$(): Observable<IClient[]> {
        return this._state.orders.showClients.$() as Observable<IClient[]>;
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
                    tap(this._state.orders.showClients.set)
                )
                .subscribe()
            )
    }
    //#endregion

}