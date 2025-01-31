import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { IClient } from '../../domain/model/client.model';
import { Observable, Subscription, tap } from 'rxjs';
import { CreateClientService } from '../../infrastructure/services/create-client.service';

@Injectable({
  providedIn: 'root',
})
export class CreateClientUsecase {
  private readonly _service = inject(CreateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  private mensajeExito = '¡Cliente creado con éxito!';
  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  execute(client: IClient): void {
    this.subscriptions.add(
    this._service.createClient(client).pipe(
      tap((client) => {
        const currentClients = this._state.clients.snapshot();
        this._state.clients.set([...currentClients, client]);
        this.mensajeExito;
        setTimeout(() => {
          this.mensajeExito = null;
        }, 3000);
      }),
    ).subscribe()
  )
  }

  //#endregion

  //#region Private Methods
  //#endregion
}
