import { inject, Injectable } from "@angular/core";
import { ClientState } from "./users.state";
//clase state que contiene todos los estados
@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _users = inject(ClientState);

  get users() {
    return this._users.store();
  }
}