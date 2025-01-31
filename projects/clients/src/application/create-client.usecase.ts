import { inject, Injectable } from '@angular/core';
import { StateIndexClient } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { Iclient } from '../domain/model/client.model';
import { GetClientService } from '../infrastructure/services/get-clients.service';

@Injectable({providedIn: 'root'})
export class GetClientUseCase {
  private readonly _state = inject(StateIndexClient)
  private readonly _service = inject(GetClientService)
  private subscriptions: Subscription;

  client$():Observable<Iclient[]>{
    return this._state.clientState.clients.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute():void{
    this.subscriptions.add(
      this._service.execute().pipe(
        tap(
          this._state.clientState.clients.changeState)
      ).subscribe()
    )
  }

}
