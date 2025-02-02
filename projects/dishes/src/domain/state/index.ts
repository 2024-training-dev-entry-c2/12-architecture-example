import { inject, Injectable } from "@angular/core";
import { DishesState } from "./dish.state";
import { MenusState } from "menus";


@Injectable({
    providedIn: 'root'
})


export class State{

    private readonly _dishes = inject(DishesState);
    private readonly _menus = inject(MenusState);

    get dishes() {
        return this._dishes.store();
    }

    get menus() {
        return this._menus.store();
    }

}