import { BehaviorSubject } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IClient } from '../model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientState {
  private readonly _factory = inject(StateFactory);
  private readonly client$ = new BehaviorSubject<IClient[]>([]);
  private readonly currenClient$ = new BehaviorSubject<IClient>(null);

  store() {
    return {
      client: this._factory.state(this.client$),
      currenClient: this._factory.state(this.currenClient$),
    };
  }
}
