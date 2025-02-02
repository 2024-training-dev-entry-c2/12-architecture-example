import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UsersState {
    
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly user$ = new BehaviorSubject<IUser>(null);
    //#endregion

    store() {
        return {
            user: this._factory.state(this.user$)
        }
    }
}