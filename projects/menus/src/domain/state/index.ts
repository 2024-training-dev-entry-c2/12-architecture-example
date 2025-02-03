import { inject, Injectable } from "@angular/core";
import { MenusState } from "./menus.state";

//Centraliza todo el estado
@Injectable({
    providedIn: 'root'
})
export class State {
    private readonly _menus = inject(MenusState);

    get menus(){
        return this._menus.store();
    }
}