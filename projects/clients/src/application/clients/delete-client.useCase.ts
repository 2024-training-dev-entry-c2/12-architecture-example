import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Subscription, tap } from "rxjs";
import { DeleteClientService } from "../../infrastructure/services/delete-clients.service";

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

    execute(id: string): void {
        if (!id) {
            console.error('No se proporcionó un ID válido para eliminar el cliente.');
            return;
        }

        this.subscriptions.add(
            this._service.deleteClient(id)
            .pipe(
                tap(() => {
                    setTimeout(() => { // Se agrega timeout para asegurar que el frontend se actualiza
                        const clients = this._state.clients.client.snapshot();
                        const newClients = clients.filter(client => client.id !== id);
                        this._state.clients.client.set(newClients);
                    }, 500);
                })
            ).subscribe()
        );
    }
}
