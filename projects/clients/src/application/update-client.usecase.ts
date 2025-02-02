import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { UpdateClientService } from "../infrastructure/services/update-client.service";
import { delay, finalize, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../domain/model/client.model";

@Injectable({
    providedIn: 'root'
})
export class UpdateClientUseCase {
    private readonly _service = inject(UpdateClientService);
    private readonly _state = inject(State);
    private subscription: Subscription;

    //#region Observables
    message$(): Observable<string> {
        return this._state.clients.message.$();
    }

    currentClient$(): Observable<IClient> {
        return this._state.clients.currentClient.$()
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscription = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscription.unsubscribe();
    }

    execute(client: IClient) {
        this.subscription.add(
            this._service.execute(client.id, client)
                .pipe(
                    tap(result => {
                        this._state.clients.message.set(result.message)
                        const currentClients = this._state.clients.showClients.snapshot();
                        const updatedClients = currentClients.map(c => c.id === client.id ? client : c);
                        this._state.clients.showClients.set(updatedClients);
                    }),
                    delay(2000),
                    finalize(() => {
                        this._state.clients.currentClient.set(null);
                        this._state.clients.open.set(false);
                        this._state.clients.message.set('');
                    })
                ).subscribe()
        )
    }

    selectClient(clientId: number) {
        const currentClient = this._state.clients.showClients.snapshot().find(c => c.id === clientId);
        this._state.clients.currentClient.set(currentClient);
    }
    //#endregion
}