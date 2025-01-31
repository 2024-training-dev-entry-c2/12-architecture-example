import { inject, Injectable } from '@angular/core';
import { ClientService } from '../../infrastructure/services/create/client.service';
import { Observable, Subscription, tap } from 'rxjs';
import { IClient } from '../../domain/model/client.model';
import { State } from '../../domain/state';
import { GetClientService } from '../../infrastructure/services/get/get-client.service';

@Injectable({
  providedIn: 'root',
})
export class GetUserUsecase {
  private readonly _service = inject(GetClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  user$(): Observable<IClient> {
    return this._state.clients.user.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }
  destroySubscriptions(): void {
    if (this.subscriptions) {
  
      this.subscriptions.unsubscribe();
    }
  }

  execute(id: number): void {

    this.subscriptions.add(
      this._service
        .getClientId(id)
        .pipe(
          tap((client: IClient) => {
            this._state.clients.user.set(client); 
          })
        )
        .subscribe(
          () => {
            console.log('Cliente obtenido');
          },
          (err) => {
            console.error('Error al obtener cliente:', err);
          }
        )
    );
  }

  //#endregion
}
