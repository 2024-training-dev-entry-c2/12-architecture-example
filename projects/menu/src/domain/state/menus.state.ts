import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IMenu } from "../model/menus.model";

@Injectable({
    providedIn: 'root'
})
export class MenusState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly menu$ =  new BehaviorSubject<IMenu[]>([]);
    //#endregion

    store() {
        return {
            menu: this._factory.state(this.menu$)
        }
    }
}