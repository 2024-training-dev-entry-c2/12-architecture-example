import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { ListClientsService } from "../../infrastructure/services/list-clients.service";
import { IClient } from "../../domain/model/clients.model";

@Injectable({
    providedIn: 'root'
})
export class ListClientsUseCase {
    private readonly _service = inject(ListClientsService);
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

    loadClients(): void {
        this.subscriptions.add(
            this._service.getClients().pipe(
                tap(result => {
                    this._state.clients.client.set(result);
                })
            ).subscribe()
        );
    }
    
    //#endregion

    //#region Private Methods
    //#endregion
}