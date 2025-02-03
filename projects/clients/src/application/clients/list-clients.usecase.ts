import { inject, Injectable } from "@angular/core";
import { ListClientsService } from "../../infrastructure/services/list-clients.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/clients.model";

@Injectable({
    providedIn: "root"
})
export class ListClientsUseCase {
    private readonly _service = inject(ListClientsService);
    private readonly _state = inject(State);

    private subscriptions: Subscription;

    client$(): Observable<IClient[]> {
        return this._state.clients.client.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
        this.subscriptions.add(
            this._service.getClients().pipe(
                tap(data => this._state.clients.client.set(data))
            ).subscribe()
        );
    }
}