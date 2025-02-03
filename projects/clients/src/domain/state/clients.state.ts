import { inject, Injectable } from "@angular/core";
import {StateFactory} from 'shared';
import { BehaviorSubject } from "rxjs";
import { IClient } from "../model/client.model";


@Injectable({
  providedIn: 'root'
})
export class ClientsState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly clients$ = new BehaviorSubject<IClient[]>([]);
  private readonly currentclients$ = new BehaviorSubject<IClient>(null);
  private readonly successMessage$ = new BehaviorSubject<string | null>(null);

  //#endregion

  store() {
    return {
      clients: this._factory.state(this.clients$),
      currentClient: this._factory.state(this.currentclients$),
      successMessage: this._factory.state(this.successMessage$)
    }
  }
  setSuccessMessage(message: string | null) {
    this.successMessage$.next(message);
  }
}
