import { inject, Injectable } from "@angular/core";
import { ClientState } from "./client.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _clients = inject(ClientState);

  get clients() {
    return this._clients.store();
  }
}