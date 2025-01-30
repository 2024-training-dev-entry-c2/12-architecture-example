import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IDish } from "../model/dish.model";

@Injectable({
    providedIn: 'root'
})
export class DishesState {
    private readonly _factory = inject(StateFactory)
    
    //#region Subjects
    private readonly dishes$ = new BehaviorSubject<IDish[]>(null);
    //#endregion

    store(){
        return {
            dishes: this._factory.state(this.dishes$)
        };
    }
}
 