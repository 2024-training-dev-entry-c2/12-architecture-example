import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { IClient } from '../../domain/model/client.model';
import { Observable, Subscription, tap } from 'rxjs';
import { CreateClientService } from '../../infrastructure/services/create-client.service';
import { ModalComponent } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreateClientUsecase {
  private readonly _service = inject(CreateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  successMessage$(): Observable<string | null> {
    return this._state.clients.successMessage.$();
  }
  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  execute(client: IClient, modal: ModalComponent): void {
    this.subscriptions.add(
    this._service.createClient(client)
    .pipe(
      tap((client) => {
        const currentClients = this._state.clients.clients.snapshot();
        this._state.clients.clients.set([...currentClients, client]);
        this._state.clients.successMessage.set('¡Cliente creado con éxito!')

        setTimeout(() => {
          modal.toggle();
        }, 2000);

      }),
    ).subscribe()
  )
  }

  //#endregion

  //#region Private Methods
  //#endregion
}
