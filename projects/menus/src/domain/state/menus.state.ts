import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "./state.factory";
import { IMenu } from "../model/menus.model";


@Injectable({
    providedIn: 'root'
})
export class MenusState {
    private readonly _factory = inject(StateFactory);
    private readonly _menus$ = new BehaviorSubject<IMenu[]>([]); 

    store() {
        return {
            menu: this._factory.state(this._menus$)
        }
    }
}