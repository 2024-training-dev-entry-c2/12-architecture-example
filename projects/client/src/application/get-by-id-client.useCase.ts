import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IClient } from "../domain/model/client.model";
import { State } from "../domain/state";
import { GetByIdClientService } from "../infrastructure/services/get-by-id-client.service";

@Injectable({
    providedIn: 'root'
})

export class GetByIdClientUseCase {
    private readonly _service = inject(GetByIdClientService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    
    client$(): Observable<IClient> {
        return this._state.clients.Oneclient$.$();
    }

 
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }


    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number): void {
        this.subscriptions.add(
            this._service.getById(id)
                .pipe(
                    tap(client => {
                        console.log(client);
                        this._state.clients.Oneclient$.set(client);
                    })
                )
                .subscribe()
        );
    }
}