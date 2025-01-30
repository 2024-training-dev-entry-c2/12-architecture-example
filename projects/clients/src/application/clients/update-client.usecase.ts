import { inject, Injectable } from "@angular/core";
import { UpdateClientService } from "../../infrastructure/services/update-client.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";
import { IClientRequest } from "../../domain/model/client-request.model";

@Injectable({
    providedIn: 'root'
})
export class UpdateClientUsecase {
    private readonly _service = inject(UpdateClientService);
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

    execute(id:number, client: IClientRequest): void {
        this.subscriptions.add(
            this._service.execute(id.toString(), client).pipe(
                tap(result => {
                    const clients = this._state.clients.clients.snapshot()
                    .map(client => client.id === result.id ? result : client);
                    this._state.clients.clients.set(clients);
                })                    
            ).subscribe()
        );
    }
    //#endregion
}