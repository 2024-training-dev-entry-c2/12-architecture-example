import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IDish } from "../model/dishes.model";

@Injectable({
    providedIn: 'root'
})
export class DishesState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly dish$ =  new BehaviorSubject<IDish[]>([]);
    //#endregion

    store() {
        return {
            dish: this._factory.state(this.dish$)
        }
    }
}