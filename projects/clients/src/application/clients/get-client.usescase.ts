import { inject, Injectable, OnDestroy } from '@angular/core';
import { State } from '../../domain/state';
import { IClients } from '../../domain/model/clients.model';
import { GetClientService } from '../../infrastructure/services/get-client.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetClientUseCase {
  private readonly _service = inject(GetClientService);
  private readonly _state = inject(State);
 private subscriptions = new Subscription();

  client$(): Observable<IClients[]> {
    return this._state.clients.client.$();
  }



  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  
  getClientsSnapshot(): IClients[] {
    return this._state.clients.client.snapshot();
  }

  execute(): void {
    if (this.getClientsSnapshot()?.length) {
      return;
    }

    this._service
      .getClients()
      .subscribe({
        next: (clients) => {
          this._state.clients.client.set(clients);
        },
        error: (error) => {
          console.error('Error fetching clients:', error);
        },
      });
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
}
}
