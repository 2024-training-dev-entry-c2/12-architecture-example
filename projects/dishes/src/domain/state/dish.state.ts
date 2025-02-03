import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IDish } from "../model/dish.model";
import { IMenu } from "../model/menu.model";

@Injectable({
    providedIn: 'root'
})
export class DishState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly dishes$ = new BehaviorSubject<IDish[]>([]);
    private readonly currentDish$ = new BehaviorSubject<IDish | null>(null);
    private readonly open$ = new BehaviorSubject<boolean>(false);
    private readonly message$ = new BehaviorSubject<string>('');
    private readonly menus$ = new BehaviorSubject<IMenu[]>(null);
    private readonly menu$ = new BehaviorSubject<IMenu>(null);
    //#endregion

    store() {
        return {
            menus: this._factory.state(this.menus$),
            menu: this._factory.state(this.menu$),
            showDishes: this._factory.state(this.dishes$),
            currentDish: this._factory.state(this.currentDish$),
            open: this._factory.state(this.open$),
            message: this._factory.state(this.message$)
        }
    }
}