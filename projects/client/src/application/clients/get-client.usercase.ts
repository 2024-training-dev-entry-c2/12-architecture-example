import { inject, Injectable } from '@angular/core';
import { ClientService } from '../../infrastructure/services/create/client.service';
import { Observable, Subscription, tap } from 'rxjs';
import { IClient } from '../../domain/model/client.model';
import { State } from '../../domain/state';
import { GetClientService } from '../../infrastructure/services/get/get-client.service';
import { ClientState } from '../../domain/state/client.state';

@Injectable({
  providedIn: 'root',
})
export class GetUserUsecase {
  private readonly _service = inject(GetClientService);
  private readonly _state = inject(ClientState);
  private subscriptions: Subscription = new Subscription();

  user$(): Observable<IClient | null> {
    return this._state.store().user.$();
  } 

  execute(id: number): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this._service.getClientId(id).pipe(
        tap((client: IClient) => {
          this._state.setClient(client); 
        })
      ).subscribe(
        (client: IClient) => {
          console.log('Cliente obtenido en el componente:', client); 
          this._state.setClient(client); 
        },
      )
    );
  }

  //#endregion
}
