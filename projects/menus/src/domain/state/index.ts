import { inject, Injectable } from "@angular/core";
import { MenusState } from "./menus.state";
// import { DishesState } from "../../../../dishes/src/domain/state/dish.state";

@Injectable({
    providedIn: 'root'
})

export class State{
    private readonly _menus = inject(MenusState);
    // private readonly _dishes = inject(DishesState);


    // get dishes(){
    //     return this._dishes.store();
    // }

    get menus(){
        return this._menus.store();
    }

} 