import { inject, Injectable } from "@angular/core";
import { DeleteClientService } from "../infrastructure/services/delete-client.service";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeleteClientUseCase {
    private readonly _service = inject(DeleteClientService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(clientId: number) {
        this.subscriptions.add(
            this._service.execute(clientId).pipe(
                tap(result => {
                    const currentClients = this._state.clients.showClients.snapshot();
                    this._state.clients.showClients.set(currentClients.filter(c => c.id !== clientId));
                })
            ).subscribe()
        );
    }
    //#endregion
}