import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { IClient } from '../../domain/model/client.model';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { UpdateClientService } from '../../infrastructure/services/update/update-client.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateClientUseCase {
  private readonly _service = inject(UpdateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

   //#region Observables
   currentClient$(): Observable<IClient> {
    return this._state.clients.currentClient.$();
  }

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
    this._service.updateClient(client)
    .pipe(
      tap((client) => {
        const clients = this._state.clients.clients.snapshot();
            const newClient = clients.map(c => c.id === client.id ? client : c);
            this._state.clients.clients.set(newClient);
            this._state.clients.successMessage.set('¡Cliente actualizado con éxito!')
            this._state.clients.currentClient.set(null);

        setTimeout(() => {
          modal.toggle();
          this._state.clients.successMessage.set('')
        }, 1000);
      }),
    ).subscribe()
  )
  }
  selectClient(id: number): void {
    const currentClient = this._state.clients.clients.snapshot().find(client => client.id === id);
    console.log("select dentro de caso de uso")
    this._state.clients.currentClient.set(currentClient);
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
