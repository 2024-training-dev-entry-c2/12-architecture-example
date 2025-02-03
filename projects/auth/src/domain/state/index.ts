import { Injectable, inject } from "@angular/core";
import { AuthState } from "./auth.state";

@Injectable({
    providedIn: 'root'
})
export class State {
    private readonly _users = inject(AuthState);

    get users() {
        return this._users.store();
    }
}