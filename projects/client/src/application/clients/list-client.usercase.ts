import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";
import { State } from "../../domain/state";
import { ListClientService } from "../../infrastructure/services/list/list-client.service";

@Injectable({
    providedIn: 'root'
  })
  export class GetUsersListUsecase {
    private readonly _service = inject(ListClientService); // Servicio para obtener los clientes
    private readonly _state = inject(State); // Estado global
    private subscriptions: Subscription = new Subscription(); // Manejo de subscripciones
  
    //#region Observables
    clients$(): Observable<IClient[]> {
      return this._state.clients.users.$(); // Expone la lista de clientes como un Observable
    }
    //#endregion
  
    //#region Public Methods
    initSubscriptions(): void {
      // Inicializa las subscripciones si es necesario
    }
  
    destroySubscriptions(): void {
      this.subscriptions.unsubscribe(); // Limpia las subscripciones
    }
  
    execute(): void {
      this.subscriptions.add(
        this._service.getClients() // Llama al servicio para obtener todos los clientes
          .pipe(
            tap((clients: IClient[]) => {
              this._state.clients.users.set(clients); // Actualiza el estado global con la lista de clientes
            })
          )
          .subscribe(
            () => {
                console.log('Clientes obtenidos');
                
            },
          )
      );
    }
    //#endregion
  }
  