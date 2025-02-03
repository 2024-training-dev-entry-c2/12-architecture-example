import { inject, Injectable } from "@angular/core";
import { DishesState } from "./dishes.state";

//Centraliza todo el estado
@Injectable({
    providedIn: 'root'
})
export class State {
    private readonly _dishes = inject(DishesState);

    get dishes(){
        return this._dishes.store();
    }
}