


import { inject, Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { StateIndexClient } from '../domain/state';
import { DeleteClientService } from '../infrastructure/services/delete-client.service';

@Injectable({providedIn: 'root'})
export class DeleteClientUseCase {

  private readonly _deleteService = inject(DeleteClientService);
  private readonly _state = inject(StateIndexClient);
  private subscriptions: Subscription;


  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._deleteService.execute(id)
        .pipe(
          tap((client) => {
            const allClients = this._state.clientState.clients.valueState();
            this._state.clientState.clients.changeState(allClients.filter(u => u.id !== id));
          }),
        ).subscribe()
    );
  }

}
