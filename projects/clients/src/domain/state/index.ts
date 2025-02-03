import { inject, Injectable } from '@angular/core';
import { ClientState } from './client.state';

@Injectable({providedIn: 'root'})
export class StateIndexClient {

  private readonly _stateClient = inject(ClientState);

  get clientState(){
    return this._stateClient.store();
  }

}
