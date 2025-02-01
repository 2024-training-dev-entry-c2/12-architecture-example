import { Injectable, inject } from "@angular/core";
import { Subscription, Observable, tap } from "rxjs";
import { State } from "../../domain/state";
import { ListClientsService } from "../../infrastructure/services/list-clients.service";
import { IClient } from "../../domain/model/client.model";

@Injectable({
    providedIn: 'root'
})
export class ListClientsUsecase {
    private readonly _service = inject(ListClientsService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    
    //#region Observables
    clients$(): Observable<IClient[]> {
        return this._state.clients.clients.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
        this.subscriptions.add(
            this._service.execute().pipe(
                tap( this._state.clients.clients.set )                    
            ).subscribe()
        );
    }
    //#endregion
}