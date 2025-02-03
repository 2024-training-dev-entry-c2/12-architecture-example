import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { IClient } from '../domain/model/client.model';
import { CreateClientService } from '../infrastructure/services/create-client.service';

@Injectable({
  providedIn: 'root',
})
export class CreateClientUseCase {
  private readonly _service = inject(CreateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(client: IClient): void {
    this.subscriptions.add(
      this._service
        .execute(client)
        .pipe(
          tap((client) => {
            const clients = this._state.clientState.client.snapshot();
            this._state.clientState.client.set([...clients, client]);
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
