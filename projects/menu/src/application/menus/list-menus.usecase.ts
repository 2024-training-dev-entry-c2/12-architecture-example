import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IMenu } from "../../domain/model/menus.model";
import { Observable, Subscription, tap } from "rxjs";
import { ListMenusService } from "../../infrastructure/services/list-menus.service";

@Injectable({
    providedIn: 'root'
})
export class ListMenusUseCase {
    private readonly _service = inject(ListMenusService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    menu$(): Observable<IMenu[]> {
        return this._state.menus.menu.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    loadMenus(): void {
        this.subscriptions.add(
            this._service.getMenus().pipe(
                tap(result => {
                    console.log("Datos recibidos de la API:", result); // Depuración
                    this._state.menus.menu.set(result);
                })
            ).subscribe()
        );
    }
    
    //#endregion

    //#region Private Methods
    //#endregion
}