import { inject, Injectable } from "@angular/core";
import { tap, Subscription, switchMap,map,Observable } from "rxjs";
import { IClient } from "../domain/model/client.model";
import { State } from "../domain/state";
import { RegisterClientService } from "../infrastructure/services/register-client.service";
import { GetAllClientService } from "../infrastructure/services/get-all-client.service";

@Injectable({
    providedIn: 'root'
})

export class RegisterClientUseCase {
    private readonly _createService = inject(RegisterClientService);
    private readonly _getAllService = inject(GetAllClientService);
    private readonly _state = inject(State);
    
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    
    execute(newClient: Partial<IClient>): Observable<void> {
        return this._createService.save(newClient).pipe(
            tap(response => {
                console.log(`Cliente creado: ${response}`);
            }),
            switchMap(() => this._getAllService.getAll()),
            tap(updatedClientList => {
                this._state.clients.client.set(updatedClientList);
            }),
            map(() => void 0) 
        );
    }



}