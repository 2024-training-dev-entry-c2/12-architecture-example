import { inject, Injectable, OnDestroy } from "@angular/core";
import { EditClientService } from "../../infrastructure/services/edit-client.service";
import { State } from "../../domain/state";
import { IClients } from "../../domain/model/clients.model";
import { Observable, Subscription, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EditClientUseCase {
    private readonly _service = inject(EditClientService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    client$(): Observable<IClients[]> {
        return this._state.clients.client.$();
    }

    execute(client: IClients): void {
        this.subscriptions.add(
            this._service.editClient(client)
                .pipe(
                    tap(updatedClient => {
                        const currentClients = this._state.clients.client.snapshot();
                        const updatedClients = currentClients.map(c => 
                            c.id === updatedClient.id ? updatedClient : c
                        );
                        this._state.clients.client.set(updatedClients);
                    })
                )
                .subscribe()
        );
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }
}