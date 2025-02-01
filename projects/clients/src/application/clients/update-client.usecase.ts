import { inject, Injectable } from "@angular/core";
import { UpdateClientService } from "../../infrastructure/services/update-client.service";
import { State } from "../../domain/state";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";
import { ModalComponent } from "shared";

@Injectable({
    providedIn: 'root'
})
export class UpdateClientUsecase {
    private readonly _service = inject(UpdateClientService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    
    //#region Observables
    currentClient$(): Observable<IClient> {
        return this._state.clients.currentClient.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    selectClient(id:number) : void {
        const currentClient = this._state.clients.clients.snapshot().find(client => client.id == id);
        this._state.clients.currentClient.set(currentClient);
    }

    execute(client: IClient, modal: ModalComponent): void {
        this.subscriptions.add(
            this._service.execute(client.id.toString(), client).pipe(
                tap(result => {
                    const clients = this._state.clients.clients.snapshot()
                    .map(client => client.id === result.id ? result : client);
                    this._state.clients.clients.set(clients);
                    this._state.clients.currentClient.set(null);                    
                }),
                finalize(()=> modal.toggle())                    
            ).subscribe()
        );
    }
    //#endregion
}