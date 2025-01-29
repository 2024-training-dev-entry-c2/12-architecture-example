import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IDishes } from '../model/dishes.model';

@Injectable({
    providedIn: 'root'
})
export class DishesState {
    private readonly _factory = inject(StateFactory);
    
    
    private readonly _dish$ = new BehaviorSubject<IDishes[]>([]); 

    store() {
        return {
            dish: this._factory.state(this._dish$)
        }
    }
}