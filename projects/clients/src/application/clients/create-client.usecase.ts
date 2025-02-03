import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IClient } from "../../domain/model/clients.model";
import { Subscription, tap } from "rxjs";
import { CreateClientsService } from "../../infrastructure/services/create-clients.service";
import { ModalComponent } from "shared";

@Injectable({
    providedIn: 'root'
})
export class CreateClientUseCase {
    //accede al estado del dominio y capa de infraestructura(services),
    // orquesta las peticiones, crea el cliente, setea en el estado, mapeo, cambio en la información
    private readonly _service = inject(CreateClientsService);
    private readonly _state = inject(State);

    //suscribpcciones para cerrar el ciclo de vida de los observables
    private subscriptions: Subscription;


    //retornar observables, siempre deben ir al inicio
    //#region observable

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
            this._service.createClient(client).
            pipe(
                tap((client) => {
                    const clients = this._state.clients.client.snapshot();
                    this._state.clients.client.set([...clients, client]);
                    modal.toggle();
                }),
            ).subscribe()
        );
    }
    //#endregion
    
    
    //#region private methods
    //#endregion private methods

}