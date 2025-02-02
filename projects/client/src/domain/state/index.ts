import { inject, Injectable } from '@angular/core';
import { ClientState } from './client.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _client = inject(ClientState);

  get clientState() {
    return this._client.store();
  }
}
