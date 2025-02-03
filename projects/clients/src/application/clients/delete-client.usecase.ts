import { inject, Injectable } from "@angular/core";
import { DeleteClientService } from "../../infrastructure/services/delete-client.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";

@Injectable({
    providedIn: 'root'
})
export class DeleteClientUsecase {
    private readonly _service = inject(DeleteClientService);
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

    execute(id: number): void {
        this.subscriptions.add(
            this._service.execute(id.toString()).pipe(
                tap(() => {
                    const clients = this._state.clients.clients.snapshot()
                    .filter(client => client.id != id);
                    this._state.clients.clients.set(clients);            
                })                    
            ).subscribe()
        );
    }
    //#endregion
}