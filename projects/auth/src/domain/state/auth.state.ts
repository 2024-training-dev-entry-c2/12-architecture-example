import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IAuth } from "../model/auth.model";
import { StateFactory } from "./state.factory";
import { IAuthenticationResponse } from "../model/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly auth$ = new BehaviorSubject<IAuthenticationResponse>(null);
    private readonly userSave$ = new BehaviorSubject<IAuthenticationResponse>(null);
    //#endregion

    store() {
        return {
            auth: this._factory.state(this.auth$),
            userSave: this._factory.state(this.userSave$)
        }
    }
}