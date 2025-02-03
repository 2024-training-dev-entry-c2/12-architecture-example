import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IClient } from "../../domain/model/clients.model";
import { Observable, Subscription, tap } from "rxjs";
import { ModalComponent } from "shared";
import { UpdateClientsService } from "../../infrastructure/services/update-clients.service";

@Injectable({
    providedIn: 'root'
})
export class UpdateClientUseCase {
    //accede al estado del dominio y capa de infraestructura(services),
    // orquesta las peticiones, crea el cliente, setea en el estado, mapeo, cambio en la información
    private readonly _service = inject(UpdateClientsService);
    private readonly _state = inject(State);

    //suscribpcciones para cerrar el ciclo de vida de los observables
    private subscriptions: Subscription;


    //retornar observables, siempre deben ir al inicio
    //#region observable
    currentClient$(): Observable<IClient> {
        return this._state.clients.currentClient.$();
    }

    //#region 
    //metodos publicos que se van a exponer

    //Inicializar la variable de suscripciones
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    //Cerrar el ciclo de vida de los observables
    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(client: IClient, modal: ModalComponent ): void {
        this.subscriptions.add(
            this._service.updateClient(client).
            pipe(
                tap((updateClient) => {
                        const clients = this._state.clients.client.snapshot();
                        const newClients = clients.map(c => c.id === updateClient.id ? updateClient : c);
                        this._state.clients.client.set(newClients);
                        modal.toggle();
                        this._state.clients.currentClient.set(null);
                }),
            ).subscribe()
        );
    }
    //#endregion
    
    
    //#region private methods
    selectClient(id: string): void {
        const currentClient = this._state.clients.client.snapshot().find(client => client.id === id);
        this._state.clients.currentClient.set(currentClient);
    }
    //#endregion private methods

}