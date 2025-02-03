import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { DeleteClientService } from "../infrastructure/services/delete-client.service";

@Injectable({
    providedIn: 'root'
})

export class DeleteClientUseCase {
    private readonly _service = inject(DeleteClientService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number): void {
        this.subscriptions.add(
            this._service.delete(id)
                .pipe(
                    tap(response => {
                        console.log(`Cliente eliminado: ${response}`);
                        const currentClients = this._state.clients.client.snapshot();
                        const updatedClients = currentClients.filter(client => client.id !== id);
                        this._state.clients.client.set(updatedClients);
                    })
                )
                .subscribe()
        );
    }

}