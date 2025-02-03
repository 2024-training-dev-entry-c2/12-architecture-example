
import { inject, Injectable } from '@angular/core';
import { Iclient } from '../domain/model/client.model';
import { ModalComponent } from 'shared';
import { Subscription, tap } from 'rxjs';
import { CreateClientService } from '../infrastructure/services/create-client.service';
import { StateIndexClient } from '../domain/state';

@Injectable({providedIn: 'root'})
export class createClientUseCase {

  private readonly _createClientService = inject(CreateClientService);
  private readonly _state = inject(StateIndexClient);
  private subscriptions: Subscription;


  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(client: Iclient, modal: ModalComponent): void {
    this.subscriptions.add(
      this._createClientService.execute(client)
        .pipe(
          tap((cliente) => {
            const allClients = this._state.clientState.clients.valueState();
            this._state.clientState.clients.changeState([...allClients, cliente]);
            modal.toggle();
          }),
        ).subscribe()
    );

  }
}
