import { Injectable, inject } from "@angular/core";
import { UserState } from "./user.state";

@Injectable({
    providedIn: 'root'
})
export class State {
    private readonly _users = inject(UserState);

    get users() {
        return this._users.store();
    }
}