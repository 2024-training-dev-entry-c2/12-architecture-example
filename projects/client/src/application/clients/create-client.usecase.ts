import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { CreateClientService } from "../../infrastructure/services/create-client.service";
import { IClient } from "../../domain/model/clients.model";

@Injectable({
    providedIn: 'root'
})
export class CreateClientUseCase {
    private readonly _service = inject(CreateClientService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    client$(): Observable<IClient[]> {
        return this._state.clients.client.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    addClient(client: IClient): void {
        this.subscriptions.add(
            this._service.createClient(client)
                .pipe(
                    tap(result => {
                        const clients = this._state.clients.client.snapshot();
                        this._state.clients.client.set([...clients, result]);
                    })
                ).subscribe()
        );
    }
    //#endregion

    //#region Private Methods
    //#endregion
}