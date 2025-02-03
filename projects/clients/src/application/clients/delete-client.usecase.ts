import { inject, Injectable, OnDestroy } from "@angular/core";
import { DeleteClientService } from "../../infrastructure/services/delete-client.service";
import { State } from "../../domain/state";
import { IClients } from "../../domain/model/clients.model";
import { Observable, Subscription, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeleteClientUseCase implements OnDestroy {
    private readonly _service = inject(DeleteClientService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    client$(): Observable<IClients[]> {
        return this._state.clients.client.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
      }
      

    execute(client: IClients): void {
        this.subscriptions.add(
            this._service.deleteClient(client)
                .pipe(
                    tap(() => {
                        const currentClients = this._state.clients.client.snapshot();
                        const filteredClients = currentClients.filter(c => c.id !== client.id);
                        this._state.clients.client.set(filteredClients);
                    })
                )
                .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}