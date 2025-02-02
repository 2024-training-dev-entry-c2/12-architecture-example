import { inject, Injectable } from "@angular/core";
import { tap, Subscription, switchMap, map, Observable } from "rxjs";
import { IMenu } from "../domain/model/menu.model";
import { State } from "../domain/state";
import { RegisterMenuService } from "../infrastructure/services/register-menu.service";
import { GetAllMenuService } from "../infrastructure/services/get-all-menu.service";

@Injectable({
    providedIn: 'root'
})
export class RegisterMenuUseCase {
    private readonly _createService = inject(RegisterMenuService);
    private readonly _getAllService = inject(GetAllMenuService);
    private readonly _state = inject(State);

    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(newMenu: Partial<IMenu>): Observable<void> {
        return this._createService.save(newMenu).pipe(
            tap(response => {
                console.log(`Menú creado: ${response}`);
            }),
            switchMap(() => this._getAllService.getAll()),
            tap(updatedMenuList => {
                this._state.menus.menu.set(updatedMenuList);
            }),
            map(() => void 0) 
        );
    }
}
