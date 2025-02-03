import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IMenu } from "../model/menu.model";

@Injectable({
    providedIn: 'root'
})
export class MenuState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly menus$ = new BehaviorSubject<IMenu[]>([]);
    private readonly currentMenu$ = new BehaviorSubject<IMenu | null>(null);
    private readonly open$ = new BehaviorSubject<boolean>(false);
    private readonly message$ = new BehaviorSubject<string>('');
    //#endregion

    store() {
        return {
            showMenus: this._factory.state(this.menus$),
            currentMenu: this._factory.state(this.currentMenu$),
            open: this._factory.state(this.open$),
            message: this._factory.state(this.message$)
        }
    }
}