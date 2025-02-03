import { inject, Injectable } from "@angular/core";
import { CreateClientService } from "../../infrastructure/services/create-client.service";
import { State } from "../../domain/state";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";
import { ModalComponent } from "shared";

@Injectable({
    providedIn: 'root'
})
export class CreateClientUsecase {
    private readonly _service = inject(CreateClientService);
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

    execute(client: IClient, modal : ModalComponent): void {
        this.subscriptions.add(
            this._service.execute(client).pipe(
                tap(result => {
                    const clients = this._state.clients.clients.snapshot();
                    this._state.clients.clients.set([...clients, result]);
                }),
                finalize(()=> modal.toggle())                    
            ).subscribe()
        );
    }
    //#endregion
}