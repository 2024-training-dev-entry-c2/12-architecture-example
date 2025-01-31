import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iclient } from '../model/client.model';
import { StateFacotory } from 'shared';

@Injectable({providedIn: 'root'})
export class ClientState {

  private readonly _factory = inject(StateFacotory);

  //#region
  private readonly clients$ = new BehaviorSubject<Iclient[]>([])
  private readonly clientsUnique = new BehaviorSubject<Iclient>(null)
  //#endregion

  store(){
    return{
      clients: this._factory.stateFunctions(this.clients$),
      clientUnique: this._factory.stateFunctions(this.clientsUnique)
    }
  }
}
