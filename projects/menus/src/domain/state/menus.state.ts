import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IMenu } from "../model/menu.model";

@Injectable({
    providedIn: 'root'
})
export class MenusState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly menus$ = new BehaviorSubject<IMenu[]>(null);
    //#endregion

    store(){
        return {
            menus: this._factory.state(this.menus$)
        };
    }
}