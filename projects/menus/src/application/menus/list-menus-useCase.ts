import { inject, Injectable } from "@angular/core";
import { ListMenusService } from "../../infrastructure/services/list-menus.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu } from "../../domain/model/menus.model";

@Injectable({
    providedIn: 'root'
})
export class ListMenusUseCase {
    private readonly _service = inject(ListMenusService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    menu$(): Observable<IMenu[]> {
        return this._state.menus.menu.$();
    }
    
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
        this.subscriptions.add(
            this._service.getMenus().pipe(
                tap(data => this._state.menus.menu.set(data))
            ).subscribe()
        )
    }
}