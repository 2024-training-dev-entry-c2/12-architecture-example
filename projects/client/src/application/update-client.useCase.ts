import { inject, Injectable } from "@angular/core";
import { tap,Subscription,Observable,switchMap,of } from "rxjs";
import { IClient } from "../domain/model/client.model";
import { State } from "../domain/state";
import { UpdateClientService } from "../infrastructure/services/update-client.service";

@Injectable({
    providedIn: 'root'
})


export class UpdateClientUseCase {

    private readonly _service = inject(UpdateClientService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }


    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    
    execute(id: number, updatedClient: Partial<IClient>): Observable<void> {
        return this._service.update(id, updatedClient).pipe(
            tap(updatedClient => {
                console.log(`Cliente actualizado: ${updatedClient}`);
    
                const currentClients = this._state.clients.client.snapshot();
                const updatedClients = currentClients.map(client =>
                    client.id === id ? { ...client, ...updatedClient } : client
                );
    
                this._state.clients.client.set(updatedClients);
            }),
            switchMap(() => of(void 0)) 
        );
    }
    

}