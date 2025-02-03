import { inject, Injectable } from '@angular/core';
import { UpdateClientService } from '../infrastructure/services/update-client.service';
import { StateIndexClient } from '../domain/state';
import { Iclient } from '../domain/model/client.model';
import { ModalComponent } from 'shared';
import { Observable, Subscription, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateClientUseCase {
  private readonly _serviceUpdate = inject(UpdateClientService);
  private readonly _state = inject(StateIndexClient);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  clientCurrent$(): Observable<Iclient> {
    return this._state.clientState.clientUnique.$();
  }

  execute(client: Iclient, modal: ModalComponent): void {
    this.subscriptions.add(
      this._serviceUpdate
        .execute(client)
        .pipe(
          tap((user) => {
            const allClients = this._state.clientState.clients.valueState();
            const newClient = allClients.map((u) =>
              u.id === user.id ? user : u
            );
            this._state.clientState.clients.changeState(newClient);
            modal.toggle();
            this._state.clientState.clientUnique.changeState(null);
          })
        )
        .subscribe()
    );
  }

  selectClient(id: number): void {
    const clientActual = this._state.clientState.clients
      .valueState()
      .find((u) => u.id === id);
    this._state.clientState.clientUnique.changeState(clientActual);
  }
}
