import { inject, Injectable } from '@angular/core';
import { StateFactory } from './state.factory';
import { BehaviorSubject } from 'rxjs';
import { IClient } from '../model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly client$ = new BehaviorSubject<IClient | null>(null);
  private readonly users$ = new BehaviorSubject<IClient[]>([]);

  store() {
    return {
      // Aquí solo gestionamos el estado del cliente único
      user: this._factory.state(this.client$),
      users: this._factory.state(this.users$),
    };
  }
  setClient(client: IClient): void {
    if (client) {
      this.client$.next({ ...client }); 
    } else {
      this.client$.next(null); 
    }
  }
}
